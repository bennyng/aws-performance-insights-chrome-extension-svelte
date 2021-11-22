# What is it ?

It does two simple things in AWS performance insights

- turn off auto-refresh by default
- allows you to set custom start/end time

# Install deps

```bash
npm install
```

# Run on local

```bash
npm run dev
```

# Build

```bash
npm run build
```

# Install from Chrome Store

https://chrome.google.com/webstore/detail/performance-insights-addo/pjddnibodmbiephkmmmlhjgmedmcidcl?hl=en-GB&authuser=0

# Install from releases

[Releases](https://github.com/bennyng/aws-performance-insights-chrome-extension-svelte/releases)

Follow guide here
https://webkul.com/blog/how-to-install-the-unpacked-extension-in-chrome/

# TODOs

- [x] chrome extension PoC - able to load extension from public folder in Chrome
- [x] detect and replace url with modified start/end timestamps
- [x] user can select timezone or be detected
- [x] user can see last Timezone from saved storage
- [x] user can choose to turn off auto-refresh upon loaded performance insights page
- [x] icons (extension icons, favicon)
- [x] polish UI with tailwind
- [x] enable tailwind jit
- [x] user can select from recent start/end timestamps
- [ ] datetime picker widget
- [ ] button for copy result URL
- [ ] svelte animate
- [ ] cicd with github actions
- [ ] publish to Chrome store
- [ ] publish to Firefox store
- [ ] publish to netlify/surge
- [ ] blog post to share
- [ ] unit tests
