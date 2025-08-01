# Contributing to Vite PWA Bootstrap

🎉 **Thank you for your interest in contributing to Vite PWA Bootstrap!**

We welcome contributions from the community and appreciate your help in making this project better.

## 🤝 How to Contribute

### 1. Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/vite-pwa-bootstrap.git
   cd vite-pwa-bootstrap
   ```

### 2. Setup Development Environment

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Run tests:
   ```bash
   npm test
   ```

4. Run linting:
   ```bash
   npm run lint
   ```

### 3. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 4. Make Your Changes

- Write clean, well-documented code
- Add tests for new functionality
- Update documentation as needed
- Follow the existing code style

### 5. Test Your Changes

```bash
# Run all tests
npm test

# Run linting
npm run lint

# Build the project
npm run build

# Check build output
ls -la dist/
```

### 6. Commit Your Changes

```bash
git add .
git commit -m "feat: add your feature description"
```

### 7. Push and Create a Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with a clear description of your changes.

## 📋 Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow ESLint configuration
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Keep functions small and focused

### File Structure

```
src/
├── index.ts           # Main entry point
├── types.ts           # TypeScript types
├── vite.ts            # Vite plugin
├── react.ts           # React hooks
├── cache.ts           # Cache manager
├── pwa.ts             # PWA functionality
├── workbox.ts         # Workbox integration
├── asset-manifest.ts  # Asset manifest generator
└── build-time.ts      # Build-time utilities
```

### Testing

- Write unit tests for new functionality
- Test edge cases and error conditions
- Ensure tests pass on all supported Node.js versions
- Use descriptive test names

### Documentation

- Update README.md for new features
- Add JSDoc comments for new APIs
- Update CHANGELOG.md for significant changes
- Include usage examples

## 🐛 Reporting Bugs

### Before Reporting

1. Check if the issue has already been reported
2. Try to reproduce the issue with the latest version
3. Check if the issue is related to your environment

### Bug Report Template

```markdown
## Bug Description
Brief description of the issue

## Steps to Reproduce
1. Step 1
2. Step 2
3. Step 3

## Expected Behavior
What you expected to happen

## Actual Behavior
What actually happened

## Environment
- OS: [e.g., macOS, Windows, Linux]
- Node.js version: [e.g., 18.0.0]
- Package version: [e.g., 1.2.0]

## Additional Information
Any other relevant information
```

## 💡 Feature Requests

### Before Requesting

1. Check if the feature already exists
2. Consider if the feature fits the project's scope
3. Think about the implementation approach

### Feature Request Template

```markdown
## Feature Description
Brief description of the feature

## Use Case
Why this feature would be useful

## Proposed Implementation
How you think this could be implemented

## Alternatives Considered
Other approaches you've considered

## Additional Information
Any other relevant information
```

## 🚀 Release Process

### For Maintainers

1. **Update Version**:
   ```bash
   npm version patch|minor|major
   ```

2. **Update CHANGELOG.md**:
   - Add new version entry
   - Document all changes
   - Update migration guide if needed

3. **Create Release**:
   - Create GitHub release
   - Tag with version number
   - Include changelog in release notes

4. **Publish to NPM**:
   ```bash
   npm publish
   ```

### Version Guidelines

- **Patch** (1.2.0 → 1.2.1): Bug fixes and minor improvements
- **Minor** (1.2.0 → 1.3.0): New features, backward compatible
- **Major** (1.2.0 → 2.0.0): Breaking changes

## 📞 Getting Help

- 📧 Email: support@basirah.com
- 🐛 Issues: [GitHub Issues](https://github.com/BaserahThing/vite-pwa-bootstrap/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/BaserahThing/vite-pwa-bootstrap/discussions)

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Vite PWA Bootstrap! 🎉
