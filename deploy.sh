#!/bin/bash

# Quick deployment script
echo "🚀 Starting deployment process..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit: Fullstack Job Tracker"
    echo "✅ Git repository initialized"
    echo ""
    echo "📝 Next steps:"
    echo "1. Create a repository on GitHub"
    echo "2. Run: git remote add origin https://github.com/YOUR_USERNAME/fullstack-job-tracker.git"
    echo "3. Run: git push -u origin main"
else
    echo "✅ Git repository already initialized"
    echo ""
    echo "📝 To push to GitHub:"
    echo "1. git add ."
    echo "2. git commit -m 'Your commit message'"
    echo "3. git push"
fi

echo ""
echo "📚 For deployment instructions, see:"
echo "   - QUICK_DEPLOY.md (quick start)"
echo "   - DEPLOYMENT.md (detailed guide)"
echo "   - GITHUB_SETUP.md (GitHub setup)"
