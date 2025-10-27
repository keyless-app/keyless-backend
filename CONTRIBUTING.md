# Contributing to CollectFi SDK

Thank you for your interest in contributing to the CollectFi SDK! This document provides guidelines and information for contributors.

## 🎯 What is CollectFi?

CollectFi is a blockchain-based investment platform on Solana that allows users to own fractional shares of high-value collectibles through SPL tokens. Our mission is to democratize access to legendary collectibles while providing liquidity and security.

## 🤝 How to Contribute

### Reporting Bugs

- Use the GitHub issue tracker
- Include detailed steps to reproduce the bug
- Provide environment information (OS, Node.js version, etc.)
- Include error messages and stack traces
- Tag issues with appropriate labels

### Suggesting Features

- Open a feature request issue
- Describe the feature and its use case
- Explain how it aligns with CollectFi's mission
- Include mockups or examples if applicable

### Code Contributions

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Add tests** for new functionality
5. **Ensure all tests pass**: `npm test`
6. **Check code quality**: `npm run lint`
7. **Commit your changes**: `git commit -m 'Add amazing feature'`
8. **Push to your branch**: `git push origin feature/amazing-feature`
9. **Open a Pull Request**

## 🏗️ Development Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Solana CLI tools (for blockchain development)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/collectfi/sdk.git
cd collectfi

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Run linting
npm run lint
```

### Development Scripts

- `npm run build` - Build the project
- `npm run dev` - Watch mode for development
- `npm test` - Run all tests
- `npm run test:watch` - Watch mode for tests
- `npm run test:coverage` - Generate coverage report
- `npm run lint` - Run ESLint
- `npm run clean` - Clean build artifacts

## 📝 Code Style Guidelines

### TypeScript

- Use TypeScript strict mode
- Prefer interfaces over types for object shapes
- Use explicit return types for public methods
- Avoid `any` type - use proper typing
- Use enums for constants with specific values

### Naming Conventions

- **Classes**: PascalCase (e.g., `CollectFi`, `AssetManager`)
- **Methods/Functions**: camelCase (e.g., `getUserPortfolio`, `buyTokens`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `TOKENS_PER_COLLECTIBLE`)
- **Interfaces**: PascalCase with descriptive names (e.g., `CollectibleAsset`)
- **Files**: kebab-case (e.g., `asset-manager.ts`, `trading-engine.ts`)

### Code Structure

- Keep functions small and focused
- Use meaningful variable and function names
- Add JSDoc comments for public methods
- Group related functionality in classes
- Separate concerns (trading, assets, vault, etc.)

### Error Handling

- Use custom error classes (`CollectFiError`)
- Include error codes for programmatic handling
- Provide meaningful error messages
- Log errors appropriately
- Handle async errors with try-catch

## 🧪 Testing Guidelines

### Test Structure

- Test files should be in `src/__tests__/`
- Use descriptive test names
- Group related tests with `describe` blocks
- Use `beforeEach` and `afterEach` for setup/cleanup
- Mock external dependencies

### Test Coverage

- Aim for 80%+ code coverage
- Test both success and error cases
- Test edge cases and boundary conditions
- Use meaningful test data
- Test async operations properly

### Example Test

```typescript
describe("AssetManager", () => {
  let assetManager: AssetManager;
  let connection: Connection;

  beforeEach(() => {
    connection = createMockConnection();
    assetManager = new AssetManager(connection, mockConfig);
  });

  it("should get available assets", async () => {
    const assets = await assetManager.getAvailableAssets();
    expect(Array.isArray(assets)).toBe(true);
    expect(assets.length).toBeGreaterThan(0);
  });
});
```

## 🔒 Security Considerations

### Smart Contract Security

- Follow Solana best practices
- Implement proper access controls
- Use multi-signature wallets for critical operations
- Validate all inputs and parameters
- Test security scenarios thoroughly

### Data Validation

- Validate all user inputs
- Sanitize data before processing
- Implement rate limiting
- Use secure random number generation
- Protect sensitive information

## 📚 Documentation

### Code Documentation

- Add JSDoc comments for public methods
- Document complex algorithms
- Include usage examples
- Document error conditions
- Keep README.md updated

### API Documentation

- Document all public interfaces
- Include parameter descriptions
- Provide return value information
- Add usage examples
- Document error codes

## 🚀 Release Process

### Versioning

- Follow [Semantic Versioning](https://semver.org/)
- Update CHANGELOG.md for all releases
- Tag releases in Git
- Update package.json version

### Release Checklist

- [ ] All tests pass
- [ ] Code quality checks pass
- [ ] Documentation is updated
- [ ] CHANGELOG.md is updated
- [ ] Version is bumped
- [ ] Release notes are prepared

## 🐛 Common Issues

### Build Issues

- Ensure TypeScript is properly configured
- Check for missing dependencies
- Verify Node.js version compatibility
- Clear build cache if needed

### Test Issues

- Check test environment setup
- Verify mock configurations
- Ensure proper async handling
- Check for timing issues

### Linting Issues

- Run `npm run lint` to see all issues
- Fix formatting issues automatically
- Address TypeScript strict mode violations
- Follow naming conventions

## 📞 Getting Help

### Communication Channels

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and discussions
- **Discord**: For community chat and support
- **Email**: For security issues (security@collectfi.app)

### Resources

- [Solana Documentation](https://docs.solana.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Jest Testing Framework](https://jestjs.io/docs/getting-started)
- [ESLint Rules](https://eslint.org/docs/rules/)

## 🙏 Recognition

Contributors will be recognized in:

- GitHub contributors list
- Release notes
- Project documentation
- Community acknowledgments

## 📄 License

By contributing to CollectFi SDK, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to CollectFi! Your contributions help make collectibles accessible to everyone. 🚀
