# Security Fix: Remove .npmrc from Git Tracking

## Date
2025-01-26

## Issue
An npm authentication token was accidentally committed to the repository in the `.npmrc` file.

### Details
- **Commit**: `1f04229` (Fix spex package to use @lindas dependencies instead of @zazuko)
- **Date of commit**: December 9th, 2025
- **Detection**: GitHub secret scanning alert
- **Token type**: npm Token (prefixed)

## Root Cause
The `.gitignore` file only excluded `.npmrc.local` but not `.npmrc` itself. This allowed the token file to be committed when it was created for local npm publishing.

## Resolution
1. **Token revoked**: The exposed npm token was immediately revoked on npmjs.com
2. **File removed from tracking**: `.npmrc` removed from git tracking using `git rm --cached`
3. **Gitignore updated**: Added `.npmrc` to `.gitignore` to prevent future accidental commits
4. **Documentation**: This document created for audit trail

## Prevention
- Always ensure `.npmrc` is in `.gitignore` before creating local npm configuration
- Use environment variables or CI/CD secrets for npm authentication in automated workflows
- Never commit authentication tokens to version control

## Files Changed
- `.gitignore` - Added `.npmrc` to ignored files
- `CHANGELOG.md` - Documented the security fix
- `docs/2025-01-26-security-fix-npmrc.md` - This documentation file
