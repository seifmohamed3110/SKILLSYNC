const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const path = require('path');
const ResumeAnalyzerFactory = require('../factories/ResumeAnalyzerFactory');
const NotificationService = require('../observers/NotificationService');
const EmailNotifier = require('../observers/EmailNotifier');

exports.uploadAndAnalyze = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();

    let text = '';

    if (ext === '.pdf') {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      text = data.text;
    } else if (ext === '.docx') {
      const data = await mammoth.extractRawText({ path: filePath });
      text = data.value;
    } else {
      return res.status(400).json({ message: 'Unsupported file type' });
    }

    // ✅ Use factory to pick analyzer
    const analyzer = ResumeAnalyzerFactory.getAnalyzer(req.user.subscription);
    const result = analyzer.analyze(text);

    // ✅ Observer pattern: notify via email (fake/console for now)
    const notifier = new NotificationService();
    notifier.attach(new EmailNotifier());
    notifier.notify(`Resume uploaded by ${req.user.email} analyzed.`);

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
};
