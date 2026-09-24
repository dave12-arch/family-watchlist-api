export function authorizeModification(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ error: "Authentication required" });
  }

  const { userId } = req.params;
  const isParent = req.user.role === "parent";
  const isChild = req.user.role === "child";
  const isSelf = String(req.user.id) === String(userId);

  if (!isParent && !(isChild && isSelf)) {
    return res.status(403).json({ error: "Access denied" });
  }

  return next();
}