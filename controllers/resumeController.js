const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const User = require('../models/User');
const { analyzeResumeText } = require('../services/huggingfaceService');
const NotificationService = require('../observers/NotificationService');
const EmailNotifier = require('../observers/EmailNotifier');

// Extract keywords based on NER groups returned by Hugging Face
const extractKeywords = (entities = []) => {
  const skills = [];
  const organizations = [];
  const jobTitles = [];

  for (const item of entities) {
    const group = item.entity_group?.toUpperCase();

    if (group === 'SKILL' || group === 'MISC') {
      skills.push(item.word);
    } else if (group === 'ORG') {
      organizations.push(item.word);
    } else if (group === 'JOB' || group === 'TITLE') {
      jobTitles.push(item.word);
    }
  }

  return { skills, organizations, jobTitles };
};

exports.uploadAndAnalyze = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'No file uploaded' });

    let text = '';

    // ✅ Extract plain text from PDF or DOCX
    if (file.mimetype === 'application/pdf') {
      const buffer = fs.readFileSync(file.path);
      const parsed = await pdfParse(buffer);
      text = parsed.text;
    } else if (
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      const result = await mammoth.extractRawText({ path: file.path });
      text = result.value;
    } else {
      return res.status(400).json({ message: 'Unsupported file format' });
    }

    // ✅ Analyze text using Hugging Face
    const entities = await analyzeResumeText(text);

    // ✅ Extract keywords
    const { skills, organizations, jobTitles } = extractKeywords(entities);

    // ✅ Update user with skills
    await User.findByIdAndUpdate(req.user.id, { resumeKeywords: skills });

    // ✅ Notify via Observer
    const notifier = new NotificationService();
    notifier.attach(new EmailNotifier());
    notifier.notify('Resume uploaded by ${req.user.email} was analyzed.');

    res.status(200).json({
      message: 'Resume analyzed successfully',
      extracted: { skills, organizations, jobTitles }
    });

  } catch (error) {
    console.error('Resume analysis failed:', error);
    res.status(500).json({ message: 'Resume analysis failed', error: error.message });
  }
};