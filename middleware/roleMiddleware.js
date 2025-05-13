exports.allowRoles = (...allowedRoles) => {
    return (req, res, next) => {
      const userRole = req.user?.role;
  
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
      }
  
      next();
    };
  };
  
  exports.restrictToRole = (requiredRole) => {
  return (req, res, next) => {
    if (req.user.role !== requiredRole) {
      return res.status(403).json({ message: `Only ${requiredRole}s are allowed to access this route.` });
    }
    next();
  };
};
