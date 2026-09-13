Write-Host "Configuring git author..."
git config user.name "Shashiverm"
git config user.email "meetshashikantkumar@gmail.com"

Write-Host "Committing multi-wallet resilience & ErrorBoundary..."
git add .gitignore src/components/ErrorBoundary.tsx src/main.tsx src/hooks/useMidnight.ts src/components/WalletConnect.tsx
git commit --author="Shashiverm <meetshashikantkumar@gmail.com>" -m "feat: add multi-wallet dev keystore support and ErrorBoundary resilience"

Write-Host "Committing Night Scan zero-404 fixes & 1-click hash copy..."
git add src/components/CircuitCall.tsx src/components/NetworkBanner.tsx src/components/PrivacyExplainer.tsx src/App.tsx src/styles/crescent.css
git commit --author="Shashiverm <meetshashikantkumar@gmail.com>" -m "fix: resolve Night Scan explorer deep links and add 1-click transaction hash copying"

Write-Host "Committing Playwright screenshots and documentation..."
git add docs/ README.md
git commit --author="Shashiverm <meetshashikantkumar@gmail.com>" -m "docs: embed Playwright automated test screenshots and update verification logs"

Write-Host "`nAll commits completed by Shashiverm! Displaying git log:`n"
git log --format="%h - %an <%ae> - %s" -n 12
