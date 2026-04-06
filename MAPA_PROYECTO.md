# Mapa Completo del Proyecto

Este archivo se genera automáticamente. Para actualizarlo, ejecuta: `npm run docs:generate-map`

```
.
├── .dependency-cruiser.js
├── .editorconfig
├── .env
├── .env.example
├── .git
│   ├── HEAD
│   ├── config
│   ├── description
│   ├── hooks
│   │   ├── applypatch-msg.sample
│   │   ├── commit-msg.sample
│   │   ├── fsmonitor-watchman.sample
│   │   ├── post-update.sample
│   │   ├── pre-applypatch.sample
│   │   ├── pre-commit.sample
│   │   ├── pre-merge-commit.sample
│   │   ├── pre-push.sample
│   │   ├── pre-rebase.sample
│   │   ├── pre-receive.sample
│   │   ├── prepare-commit-msg.sample
│   │   ├── push-to-checkout.sample
│   │   ├── sendemail-validate.sample
│   │   └── update.sample
│   ├── index
│   ├── info
│   │   └── exclude
│   ├── logs
│   │   ├── HEAD
│   │   └── refs
│   │       ├── heads
│   │       │   ├── jules-8091112965322677245-6a2ad9c1
│   │       │   └── main
│   │       └── remotes
│   │           └── origin
│   │               └── HEAD
│   ├── objects
│   │   ├── info
│   │   └── pack
│   │       ├── pack-2395a32abd1558169ca3417ef5507b3ce7e83a34.idx
│   │       ├── pack-2395a32abd1558169ca3417ef5507b3ce7e83a34.pack
│   │       └── pack-2395a32abd1558169ca3417ef5507b3ce7e83a34.rev
│   ├── packed-refs
│   ├── refs
│   │   ├── heads
│   │   │   ├── jules-8091112965322677245-6a2ad9c1
│   │   │   └── main
│   │   ├── remotes
│   │   │   └── origin
│   │   │       └── HEAD
│   │   └── tags
│   └── shallow
├── .github
│   ├── CODEOWNERS
│   ├── branch-protection.md
│   └── workflows
│       ├── ci-cd.yml
│       └── dr-drills.yml
├── .gitignore
├── .husky
│   └── pre-commit
├── .npmrc
├── .nvmrc
├── .prettierignore
├── .prettierrc
├── .vscode
│   ├── extensions.json
│   └── launch.json
├── AGENTS.md
├── CONTRIBUTING.md
├── MAPA_PROYECTO.md
├── OWNERS
├── README.md
├── SECURITY.md
├── apps
│   ├── client
│   │   ├── desktop
│   │   │   ├── portal
│   │   │   │   └── app
│   │   │   │       ├── eslint.config.mjs
│   │   │   │       ├── jest.config.cts
│   │   │   │       ├── project.json
│   │   │   │       ├── src
│   │   │   │       │   ├── app
│   │   │   │       │   │   ├── app.ts
│   │   │   │       │   │   ├── constants.ts
│   │   │   │       │   │   ├── events
│   │   │   │       │   │   │   ├── electron.events.ts
│   │   │   │       │   │   │   ├── squirrel.events.ts
│   │   │   │       │   │   │   └── update.events.ts
│   │   │   │       │   │   └── options
│   │   │   │       │   │       └── maker.options.json
│   │   │   │       │   ├── assets
│   │   │   │       │   │   └── gitkeep_tmpl_
│   │   │   │       │   ├── environments
│   │   │   │       │   │   ├── environment.prod.ts
│   │   │   │       │   │   └── environment.ts
│   │   │   │       │   ├── main.preload.ts
│   │   │   │       │   ├── main.spec.ts
│   │   │   │       │   └── main.ts
│   │   │   │       ├── tsconfig.app.json
│   │   │   │       ├── tsconfig.json
│   │   │   │       └── tsconfig.spec.json
│   │   │   └── pos
│   │   │       └── app
│   │   │           ├── eslint.config.mjs
│   │   │           ├── project.json
│   │   │           ├── src
│   │   │           │   ├── app
│   │   │           │   │   ├── api
│   │   │           │   │   │   ├── file-system.api.ts
│   │   │           │   │   │   └── pos
│   │   │           │   │   │       └── pos-native.api.ts
│   │   │           │   │   ├── app.ts
│   │   │           │   │   ├── constants.ts
│   │   │           │   │   └── events
│   │   │           │   │       ├── electron.events.ts
│   │   │           │   │       ├── squirrel.events.ts
│   │   │           │   │       └── update.events.ts
│   │   │           │   ├── environments
│   │   │           │   │   ├── environment.prod.ts
│   │   │           │   │   └── environment.ts
│   │   │           │   ├── main.preload.ts
│   │   │           │   └── main.ts
│   │   │           ├── tsconfig.app.json
│   │   │           └── tsconfig.json
│   │   ├── mobile
│   │   │   ├── app
│   │   │   │   ├── capacitor.config.ts
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── project.json
│   │   │   │   ├── public
│   │   │   │   │   └── favicon.ico
│   │   │   │   ├── src
│   │   │   │   │   ├── app
│   │   │   │   │   │   ├── app.config.ts
│   │   │   │   │   │   ├── app.html
│   │   │   │   │   │   ├── app.routes.ts
│   │   │   │   │   │   ├── app.scss
│   │   │   │   │   │   ├── app.spec.ts
│   │   │   │   │   │   ├── app.ts
│   │   │   │   │   │   ├── core
│   │   │   │   │   │   │   ├── interceptors
│   │   │   │   │   │   │   │   └── auth.interceptor.ts
│   │   │   │   │   │   │   └── services
│   │   │   │   │   │   │       ├── approvals.service.ts
│   │   │   │   │   │   │       ├── crm.service.ts
│   │   │   │   │   │   │       ├── dashboard.service.ts
│   │   │   │   │   │   │       ├── database.service.ts
│   │   │   │   │   │   │       ├── storage.service.ts
│   │   │   │   │   │   │       ├── sync
│   │   │   │   │   │   │       │   ├── conflict-resolver.service.ts
│   │   │   │   │   │   │       │   ├── connectivity.service.ts
│   │   │   │   │   │   │       │   ├── down-sync.service.ts
│   │   │   │   │   │   │       │   ├── sync-orchestrator.service.spec.ts
│   │   │   │   │   │   │       │   ├── sync-orchestrator.service.ts
│   │   │   │   │   │   │       │   ├── sync-persistence.service.ts
│   │   │   │   │   │   │       │   ├── sync-queue.service.ts
│   │   │   │   │   │   │       │   └── sync.types.ts
│   │   │   │   │   │   │       └── sync.service.ts
│   │   │   │   │   │   └── pages
│   │   │   │   │   │       ├── approvals
│   │   │   │   │   │       │   └── approvals.page.ts
│   │   │   │   │   │       ├── crm
│   │   │   │   │   │       │   └── crm.page.ts
│   │   │   │   │   │       ├── dashboard
│   │   │   │   │   │       │   ├── dashboard.page.html
│   │   │   │   │   │       │   ├── dashboard.page.scss
│   │   │   │   │   │       │   ├── dashboard.page.ts
│   │   │   │   │   │       │   └── ui
│   │   │   │   │   │       │       ├── dashboard-view.component.html
│   │   │   │   │   │       │       ├── dashboard-view.component.scss
│   │   │   │   │   │       │       └── dashboard-view.component.ts
│   │   │   │   │   │       ├── inventory
│   │   │   │   │   │       │   ├── inventory.page.html
│   │   │   │   │   │       │   ├── inventory.page.scss
│   │   │   │   │   │       │   ├── inventory.page.ts
│   │   │   │   │   │       │   └── services
│   │   │   │   │   │       │       └── inventory.facade.ts
│   │   │   │   │   │       └── login
│   │   │   │   │   │           ├── login.page.html
│   │   │   │   │   │           └── login.page.ts
│   │   │   │   │   ├── environments
│   │   │   │   │   │   ├── environment.prod.ts
│   │   │   │   │   │   └── environment.ts
│   │   │   │   │   ├── index.html
│   │   │   │   │   ├── main.ts
│   │   │   │   │   ├── styles.scss
│   │   │   │   │   └── test-setup.ts
│   │   │   │   ├── tsconfig.app.json
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vite.config.mts
│   │   │   └── e2e
│   │   │       ├── eslint.config.mjs
│   │   │       ├── playwright.config.ts
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   └── example.spec.ts
│   │   │       └── tsconfig.json
│   │   └── web
│   │       ├── cms
│   │       │   ├── app
│   │       │   │   ├── eslint.config.mjs
│   │       │   │   ├── project.json
│   │       │   │   ├── proxy.conf.json
│   │       │   │   ├── public
│   │       │   │   │   └── favicon.ico
│   │       │   │   ├── src
│   │       │   │   │   ├── app
│   │       │   │   │   │   ├── app.config.ts
│   │       │   │   │   │   ├── app.html
│   │       │   │   │   │   ├── app.routes.ts
│   │       │   │   │   │   ├── app.scss
│   │       │   │   │   │   ├── app.spec.ts
│   │       │   │   │   │   └── app.ts
│   │       │   │   │   ├── environments
│   │       │   │   │   │   ├── environment.prod.ts
│   │       │   │   │   │   └── environment.ts
│   │       │   │   │   ├── index.html
│   │       │   │   │   ├── main.ts
│   │       │   │   │   ├── styles.scss
│   │       │   │   │   └── test-setup.ts
│   │       │   │   ├── tsconfig.app.json
│   │       │   │   ├── tsconfig.json
│   │       │   │   ├── tsconfig.spec.json
│   │       │   │   └── vite.config.mts
│   │       │   └── e2e
│   │       │       ├── eslint.config.mjs
│   │       │       ├── playwright.config.ts
│   │       │       ├── project.json
│   │       │       ├── src
│   │       │       │   └── example.spec.ts
│   │       │       └── tsconfig.json
│   │       ├── ops
│   │       │   ├── app
│   │       │   │   ├── eslint.config.mjs
│   │       │   │   ├── project.json
│   │       │   │   ├── proxy.conf.json
│   │       │   │   ├── public
│   │       │   │   │   └── favicon.ico
│   │       │   │   ├── src
│   │       │   │   │   ├── app
│   │       │   │   │   │   ├── app.config.ts
│   │       │   │   │   │   ├── app.html
│   │       │   │   │   │   ├── app.routes.ts
│   │       │   │   │   │   ├── app.scss
│   │       │   │   │   │   ├── app.spec.ts
│   │       │   │   │   │   ├── app.ts
│   │       │   │   │   │   ├── auth
│   │       │   │   │   │   │   ├── auth.component.ts
│   │       │   │   │   │   │   └── login.component.ts
│   │       │   │   │   │   ├── automation
│   │       │   │   │   │   │   └── automation.component.ts
│   │       │   │   │   │   ├── backups
│   │       │   │   │   │   │   └── backups.component.ts
│   │       │   │   │   │   ├── billing
│   │       │   │   │   │   │   ├── billing.component.ts
│   │       │   │   │   │   │   └── billing.service.ts
│   │       │   │   │   │   ├── config
│   │       │   │   │   │   │   └── config.component.ts
│   │       │   │   │   │   ├── console-config
│   │       │   │   │   │   │   └── console-config.component.ts
│   │       │   │   │   │   ├── core
│   │       │   │   │   │   │   ├── auth
│   │       │   │   │   │   │   │   ├── entitlement.guard.ts
│   │       │   │   │   │   │   │   └── prm-check.directive.ts
│   │       │   │   │   │   │   ├── config
│   │       │   │   │   │   │   │   └── api-base-url.token.ts
│   │       │   │   │   │   │   ├── layout
│   │       │   │   │   │   │   │   ├── header.component.ts
│   │       │   │   │   │   │   │   ├── main-layout.component.ts
│   │       │   │   │   │   │   │   └── sidebar.component.ts
│   │       │   │   │   │   │   └── operations
│   │       │   │   │   │   │       └── operations.service.ts
│   │       │   │   │   │   ├── dashboard
│   │       │   │   │   │   │   ├── dashboard.component.ts
│   │       │   │   │   │   │   └── dashboard.service.ts
│   │       │   │   │   │   ├── databases
│   │       │   │   │   │   │   └── databases.component.ts
│   │       │   │   │   │   ├── docs
│   │       │   │   │   │   │   └── docs.component.ts
│   │       │   │   │   │   ├── feature-flags
│   │       │   │   │   │   │   └── feature-flags.component.ts
│   │       │   │   │   │   ├── finops
│   │       │   │   │   │   │   └── finops.component.ts
│   │       │   │   │   │   ├── import-export
│   │       │   │   │   │   │   └── import-export.component.ts
│   │       │   │   │   │   ├── monitoring
│   │       │   │   │   │   │   ├── monitoring.component.ts
│   │       │   │   │   │   │   └── monitoring.service.ts
│   │       │   │   │   │   ├── notifications
│   │       │   │   │   │   │   └── notifications.component.ts
│   │       │   │   │   │   ├── plugins
│   │       │   │   │   │   │   └── plugins.component.ts
│   │       │   │   │   │   ├── queues
│   │       │   │   │   │   │   └── queues.component.ts
│   │       │   │   │   │   ├── releases
│   │       │   │   │   │   │   └── releases.component.ts
│   │       │   │   │   │   ├── reports
│   │       │   │   │   │   │   └── reports.component.ts
│   │       │   │   │   │   ├── security
│   │       │   │   │   │   │   ├── security.component.ts
│   │       │   │   │   │   │   └── security.service.ts
│   │       │   │   │   │   ├── storage
│   │       │   │   │   │   │   └── storage.component.ts
│   │       │   │   │   │   ├── support
│   │       │   │   │   │   │   ├── support.component.ts
│   │       │   │   │   │   │   └── support.service.ts
│   │       │   │   │   │   ├── tenants
│   │       │   │   │   │   │   ├── components
│   │       │   │   │   │   │   │   └── tenants-table.component.ts
│   │       │   │   │   │   │   ├── create-tenant.component.ts
│   │       │   │   │   │   │   ├── tenant-detail.component.ts
│   │       │   │   │   │   │   ├── tenant.service.ts
│   │       │   │   │   │   │   ├── tenants-api.client.ts
│   │       │   │   │   │   │   ├── tenants.component.ts
│   │       │   │   │   │   │   └── tenants.facade.ts
│   │       │   │   │   │   └── testing
│   │       │   │   │   │       └── testing.component.ts
│   │       │   │   │   ├── environments
│   │       │   │   │   │   ├── environment.prod.ts
│   │       │   │   │   │   └── environment.ts
│   │       │   │   │   ├── index.html
│   │       │   │   │   ├── main.ts
│   │       │   │   │   ├── styles.scss
│   │       │   │   │   └── test-setup.ts
│   │       │   │   ├── tsconfig.app.json
│   │       │   │   ├── tsconfig.json
│   │       │   │   ├── tsconfig.spec.json
│   │       │   │   └── vite.config.mts
│   │       │   └── e2e
│   │       │       ├── eslint.config.mjs
│   │       │       ├── playwright.config.ts
│   │       │       ├── project.json
│   │       │       ├── src
│   │       │       │   ├── example.spec.ts
│   │       │       │   ├── ops-flows.spec.ts
│   │       │       │   └── provisioning.spec.ts
│   │       │       └── tsconfig.json
│   │       ├── portal
│   │       │   ├── app
│   │       │   │   ├── README.md
│   │       │   │   ├── eslint.config.mjs
│   │       │   │   ├── project.json
│   │       │   │   ├── public
│   │       │   │   │   └── favicon.ico
│   │       │   │   ├── src
│   │       │   │   │   ├── app
│   │       │   │   │   │   ├── app.config.ts
│   │       │   │   │   │   ├── app.html
│   │       │   │   │   │   ├── app.routes.ts
│   │       │   │   │   │   ├── app.scss
│   │       │   │   │   │   ├── app.spec.ts
│   │       │   │   │   │   ├── app.ts
│   │       │   │   │   │   └── core
│   │       │   │   │   │       └── interceptors
│   │       │   │   │   │           └── global-error.interceptor.ts
│   │       │   │   │   ├── assets
│   │       │   │   │   │   ├── env.js
│   │       │   │   │   │   ├── env.template.js
│   │       │   │   │   │   ├── flags
│   │       │   │   │   │   │   ├── ch.svg
│   │       │   │   │   │   │   ├── co.svg
│   │       │   │   │   │   │   ├── do.svg
│   │       │   │   │   │   │   └── us.svg
│   │       │   │   │   │   ├── i18n
│   │       │   │   │   │   │   ├── auth
│   │       │   │   │   │   │   │   ├── forgot-password-en.json
│   │       │   │   │   │   │   │   ├── forgot-password-es.json
│   │       │   │   │   │   │   │   ├── login-en.json
│   │       │   │   │   │   │   │   ├── login-es.json
│   │       │   │   │   │   │   │   ├── register-en.json
│   │       │   │   │   │   │   │   ├── register-es.json
│   │       │   │   │   │   │   │   ├── reset-password-en.json
│   │       │   │   │   │   │   │   ├── reset-password-es.json
│   │       │   │   │   │   │   │   ├── set-password-en.json
│   │       │   │   │   │   │   │   └── set-password-es.json
│   │       │   │   │   │   │   ├── en.json
│   │       │   │   │   │   │   └── es.json
│   │       │   │   │   │   ├── icons
│   │       │   │   │   │   │   ├── google.svg
│   │       │   │   │   │   │   ├── microsoft.svg
│   │       │   │   │   │   │   ├── okta.svg
│   │       │   │   │   │   │   └── passkey.svg
│   │       │   │   │   │   ├── images
│   │       │   │   │   │   │   └── default-avatar.svg
│   │       │   │   │   │   └── logos
│   │       │   │   │   │       ├── 20190923152039!Google__G__logo.svg
│   │       │   │   │   │       └── windows.svg
│   │       │   │   │   ├── environments
│   │       │   │   │   │   ├── environment.prod.ts
│   │       │   │   │   │   └── environment.ts
│   │       │   │   │   ├── index.html
│   │       │   │   │   ├── main.ts
│   │       │   │   │   ├── styles.scss
│   │       │   │   │   └── test-setup.ts
│   │       │   │   ├── tsconfig.app.json
│   │       │   │   ├── tsconfig.json
│   │       │   │   ├── tsconfig.spec.json
│   │       │   │   └── vite.config.mts
│   │       │   └── e2e
│   │       │       ├── eslint.config.mjs
│   │       │       ├── playwright.config.ts
│   │       │       ├── project.json
│   │       │       ├── src
│   │       │       │   ├── accounting.spec.ts
│   │       │       │   ├── app.spec.ts
│   │       │       │   ├── example.spec.ts
│   │       │       │   ├── journeys
│   │       │       │   │   └── o2c-flow.spec.ts
│   │       │       │   └── treasury.spec.ts
│   │       │       └── tsconfig.json
│   │       ├── pos
│   │       │   └── app
│   │       │       ├── project.json
│   │       │       ├── proxy.conf.json
│   │       │       ├── src
│   │       │       │   ├── app
│   │       │       │   │   ├── app.config.ts
│   │       │       │   │   ├── app.routes.ts
│   │       │       │   │   ├── app.spec.ts
│   │       │       │   │   └── app.ts
│   │       │       │   ├── environments
│   │       │       │   │   ├── environment.prod.ts
│   │       │       │   │   └── environment.ts
│   │       │       │   ├── index.html
│   │       │       │   ├── main.server.ts
│   │       │       │   ├── main.ts
│   │       │       │   ├── server.ts
│   │       │       │   ├── styles.scss
│   │       │       │   └── test-setup.ts
│   │       │       ├── tsconfig.app.json
│   │       │       ├── tsconfig.json
│   │       │       ├── tsconfig.spec.json
│   │       │       └── vite.config.mts
│   │       ├── shopfloor
│   │       │   └── app
│   │       │       ├── eslint.config.mjs
│   │       │       ├── project.json
│   │       │       ├── proxy.conf.json
│   │       │       ├── public
│   │       │       │   └── favicon.ico
│   │       │       ├── src
│   │       │       │   ├── app
│   │       │       │   │   ├── app.config.ts
│   │       │       │   │   ├── app.html
│   │       │       │   │   ├── app.routes.ts
│   │       │       │   │   ├── app.scss
│   │       │       │   │   ├── app.spec.ts
│   │       │       │   │   └── app.ts
│   │       │       │   ├── environments
│   │       │       │   │   ├── environment.prod.ts
│   │       │       │   │   └── environment.ts
│   │       │       │   ├── index.html
│   │       │       │   ├── main.server.ts
│   │       │       │   ├── main.ts
│   │       │       │   ├── server.ts
│   │       │       │   ├── styles.scss
│   │       │       │   └── test-setup.ts
│   │       │       ├── tsconfig.app.json
│   │       │       ├── tsconfig.json
│   │       │       ├── tsconfig.spec.json
│   │       │       └── vite.config.mts
│   │       ├── site
│   │       │   ├── app
│   │       │   │   ├── eslint.config.mjs
│   │       │   │   ├── project.json
│   │       │   │   ├── proxy.conf.json
│   │       │   │   ├── public
│   │       │   │   │   └── favicon.ico
│   │       │   │   ├── src
│   │       │   │   │   ├── app
│   │       │   │   │   │   ├── app.config.server.ts
│   │       │   │   │   │   ├── app.config.ts
│   │       │   │   │   │   ├── app.html
│   │       │   │   │   │   ├── app.routes.server.ts
│   │       │   │   │   │   ├── app.routes.ts
│   │       │   │   │   │   ├── app.scss
│   │       │   │   │   │   ├── app.spec.ts
│   │       │   │   │   │   └── app.ts
│   │       │   │   │   ├── environments
│   │       │   │   │   │   ├── environment.prod.ts
│   │       │   │   │   │   └── environment.ts
│   │       │   │   │   ├── index.html
│   │       │   │   │   ├── main.server.ts
│   │       │   │   │   ├── main.ts
│   │       │   │   │   ├── server.ts
│   │       │   │   │   ├── styles.scss
│   │       │   │   │   └── test-setup.ts
│   │       │   │   ├── tsconfig.app.json
│   │       │   │   ├── tsconfig.json
│   │       │   │   ├── tsconfig.spec.json
│   │       │   │   └── vite.config.mts
│   │       │   └── e2e
│   │       │       ├── eslint.config.mjs
│   │       │       ├── playwright.config.ts
│   │       │       ├── project.json
│   │       │       ├── src
│   │       │       │   └── example.spec.ts
│   │       │       └── tsconfig.json
│   │       ├── store
│   │       │   └── app
│   │       │       ├── eslint.config.mjs
│   │       │       ├── project.json
│   │       │       ├── proxy.conf.json
│   │       │       ├── public
│   │       │       │   └── favicon.ico
│   │       │       ├── src
│   │       │       │   ├── app
│   │       │       │   │   ├── app.config.server.ts
│   │       │       │   │   ├── app.config.ts
│   │       │       │   │   ├── app.html
│   │       │       │   │   ├── app.routes.server.ts
│   │       │       │   │   ├── app.routes.ts
│   │       │       │   │   ├── app.scss
│   │       │       │   │   ├── app.spec.ts
│   │       │       │   │   └── app.ts
│   │       │       │   ├── environments
│   │       │       │   │   ├── environment.prod.ts
│   │       │       │   │   └── environment.ts
│   │       │       │   ├── index.html
│   │       │       │   ├── main.server.ts
│   │       │       │   ├── main.ts
│   │       │       │   ├── server.ts
│   │       │       │   ├── styles.scss
│   │       │       │   └── test-setup.ts
│   │       │       ├── tsconfig.app.json
│   │       │       ├── tsconfig.json
│   │       │       ├── tsconfig.spec.json
│   │       │       └── vite.config.mts
│   │       ├── support
│   │       │   ├── app
│   │       │   │   ├── eslint.config.mjs
│   │       │   │   ├── project.json
│   │       │   │   ├── proxy.conf.json
│   │       │   │   ├── public
│   │       │   │   │   └── favicon.ico
│   │       │   │   ├── src
│   │       │   │   │   ├── app
│   │       │   │   │   │   ├── app.config.ts
│   │       │   │   │   │   ├── app.html
│   │       │   │   │   │   ├── app.routes.ts
│   │       │   │   │   │   ├── app.scss
│   │       │   │   │   │   ├── app.spec.ts
│   │       │   │   │   │   └── app.ts
│   │       │   │   │   ├── environments
│   │       │   │   │   │   ├── environment.prod.ts
│   │       │   │   │   │   └── environment.ts
│   │       │   │   │   ├── index.html
│   │       │   │   │   ├── main.ts
│   │       │   │   │   ├── styles.scss
│   │       │   │   │   └── test-setup.ts
│   │       │   │   ├── tsconfig.app.json
│   │       │   │   ├── tsconfig.json
│   │       │   │   ├── tsconfig.spec.json
│   │       │   │   └── vite.config.mts
│   │       │   └── e2e
│   │       │       ├── eslint.config.mjs
│   │       │       ├── playwright.config.ts
│   │       │       ├── project.json
│   │       │       ├── src
│   │       │       │   └── example.spec.ts
│   │       │       └── tsconfig.json
│   │       └── wms
│   │           └── app
│   │               ├── eslint.config.mjs
│   │               ├── ngsw-config.json
│   │               ├── project.json
│   │               ├── proxy.conf.json
│   │               ├── public
│   │               │   ├── favicon.ico
│   │               │   ├── icons
│   │               │   │   ├── icon-128x128.png
│   │               │   │   ├── icon-144x144.png
│   │               │   │   ├── icon-152x152.png
│   │               │   │   ├── icon-192x192.png
│   │               │   │   ├── icon-384x384.png
│   │               │   │   ├── icon-512x512.png
│   │               │   │   ├── icon-72x72.png
│   │               │   │   └── icon-96x96.png
│   │               │   └── manifest.webmanifest
│   │               ├── src
│   │               │   ├── app
│   │               │   │   ├── app.config.ts
│   │               │   │   ├── app.html
│   │               │   │   ├── app.routes.ts
│   │               │   │   ├── app.scss
│   │               │   │   ├── app.spec.ts
│   │               │   │   └── app.ts
│   │               │   ├── environments
│   │               │   │   ├── environment.prod.ts
│   │               │   │   └── environment.ts
│   │               │   ├── index.html
│   │               │   ├── main.server.ts
│   │               │   ├── main.ts
│   │               │   ├── server.ts
│   │               │   ├── styles.scss
│   │               │   └── test-setup.ts
│   │               ├── tsconfig.app.json
│   │               ├── tsconfig.json
│   │               ├── tsconfig.spec.json
│   │               └── vite.config.mts
│   ├── edge
│   │   ├── cms
│   │   │   ├── app
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── app
│   │   │   │   │   │   ├── app.controller.ts
│   │   │   │   │   │   ├── app.module.ts
│   │   │   │   │   │   ├── app.service.ts
│   │   │   │   │   │   ├── catalog-proxy.controller.ts
│   │   │   │   │   │   └── cms-api.module.ts
│   │   │   │   │   ├── assets
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   └── main.ts
│   │   │   │   ├── tsconfig.app.json
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── webpack.config.js
│   │   │   └── e2e
│   │   │       ├── jest.config.cts
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── bff-cms
│   │   │       │   │   └── bff-cms.spec.ts
│   │   │       │   └── support
│   │   │       │       ├── global-setup.ts
│   │   │       │       ├── global-teardown.ts
│   │   │       │       └── test-setup.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.spec.json
│   │   ├── ops
│   │   │   └── app
│   │   │       ├── jest.config.ts
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── app
│   │   │       │   │   ├── app.controller.ts
│   │   │       │   │   ├── app.module.ts
│   │   │       │   │   ├── app.service.ts
│   │   │       │   │   ├── identity-proxy.controller.ts
│   │   │       │   │   ├── identity-proxy.service.ts
│   │   │       │   │   └── strategies
│   │   │       │   │       ├── google.strategy.ts
│   │   │       │   │       ├── microsoft.strategy.ts
│   │   │       │   │       ├── okta.strategy.ts
│   │   │       │   │       └── session.serializer.ts
│   │   │       │   └── main.ts
│   │   │       ├── tsconfig.app.json
│   │   │       ├── tsconfig.json
│   │   │       └── webpack.config.js
│   │   ├── portal
│   │   │   ├── app
│   │   │   │   ├── Dockerfile
│   │   │   │   ├── jest.config.ts
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── app
│   │   │   │   │   │   ├── admin-proxy.controller.ts
│   │   │   │   │   │   ├── app.controller.ts
│   │   │   │   │   │   ├── app.module.ts
│   │   │   │   │   │   ├── app.service.ts
│   │   │   │   │   │   ├── auth-proxy.controller.ts
│   │   │   │   │   │   ├── identity-proxy.service.ts
│   │   │   │   │   │   ├── profile-proxy.controller.ts
│   │   │   │   │   │   ├── strategies
│   │   │   │   │   │   │   ├── google.strategy.ts
│   │   │   │   │   │   │   ├── microsoft.strategy.ts
│   │   │   │   │   │   │   ├── okta.strategy.ts
│   │   │   │   │   │   │   └── session.serializer.ts
│   │   │   │   │   │   └── user-proxy.controller.ts
│   │   │   │   │   ├── assets
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   └── main.ts
│   │   │   │   ├── tsconfig.app.json
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── webpack.config.js
│   │   │   └── e2e
│   │   │       ├── jest.config.cts
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── bff-portal
│   │   │       │   │   └── bff-portal.spec.ts
│   │   │       │   └── support
│   │   │       │       ├── global-setup.ts
│   │   │       │       ├── global-teardown.ts
│   │   │       │       └── test-setup.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.spec.json
│   │   ├── pos
│   │   │   ├── app
│   │   │   │   ├── jest.config.ts
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── app
│   │   │   │   │   │   ├── app.controller.ts
│   │   │   │   │   │   ├── app.module.ts
│   │   │   │   │   │   └── app.service.ts
│   │   │   │   │   ├── assets
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   └── main.ts
│   │   │   │   ├── tsconfig.app.json
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── webpack.config.js
│   │   │   └── e2e
│   │   │       ├── jest.config.cts
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── bff-pos
│   │   │       │   │   └── bff-pos.spec.ts
│   │   │       │   └── support
│   │   │       │       ├── global-setup.ts
│   │   │       │       ├── global-teardown.ts
│   │   │       │       └── test-setup.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.spec.json
│   │   ├── shopfloor
│   │   │   ├── app
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── app
│   │   │   │   │   │   ├── app.controller.ts
│   │   │   │   │   │   ├── app.module.ts
│   │   │   │   │   │   ├── app.service.ts
│   │   │   │   │   │   ├── shopfloor-api.module.ts
│   │   │   │   │   │   └── shopfloor-job.controller.ts
│   │   │   │   │   ├── assets
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   └── main.ts
│   │   │   │   ├── tsconfig.app.json
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── webpack.config.js
│   │   │   └── e2e
│   │   │       ├── jest.config.cts
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── bff-shopfloor
│   │   │       │   │   └── bff-shopfloor.spec.ts
│   │   │       │   └── support
│   │   │       │       ├── global-setup.ts
│   │   │       │       ├── global-teardown.ts
│   │   │       │       └── test-setup.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.spec.json
│   │   ├── site-public
│   │   │   ├── app
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── app
│   │   │   │   │   │   ├── app.controller.ts
│   │   │   │   │   │   ├── app.module.ts
│   │   │   │   │   │   └── app.service.ts
│   │   │   │   │   ├── assets
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   └── main.ts
│   │   │   │   ├── tsconfig.app.json
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── webpack.config.js
│   │   │   └── e2e
│   │   │       ├── jest.config.cts
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── bff-site-public
│   │   │       │   │   └── bff-site-public.spec.ts
│   │   │       │   └── support
│   │   │       │       ├── global-setup.ts
│   │   │       │       ├── global-teardown.ts
│   │   │       │       └── test-setup.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.spec.json
│   │   ├── storefront
│   │   │   ├── app
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── app
│   │   │   │   │   │   ├── app.controller.ts
│   │   │   │   │   │   ├── app.module.ts
│   │   │   │   │   │   ├── app.service.ts
│   │   │   │   │   │   ├── store-api.module.ts
│   │   │   │   │   │   └── store-catalog.controller.ts
│   │   │   │   │   ├── assets
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   └── main.ts
│   │   │   │   ├── tsconfig.app.json
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── webpack.config.js
│   │   │   └── e2e
│   │   │       ├── jest.config.cts
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── bff-storefront
│   │   │       │   │   └── bff-storefront.spec.ts
│   │   │       │   └── support
│   │   │       │       ├── global-setup.ts
│   │   │       │       ├── global-teardown.ts
│   │   │       │       └── test-setup.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.spec.json
│   │   ├── support
│   │   │   ├── app
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── app
│   │   │   │   │   │   ├── app.controller.ts
│   │   │   │   │   │   ├── app.module.ts
│   │   │   │   │   │   └── app.service.ts
│   │   │   │   │   ├── assets
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   └── main.ts
│   │   │   │   ├── tsconfig.app.json
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── webpack.config.js
│   │   │   └── e2e
│   │   │       ├── jest.config.cts
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── bff-support
│   │   │       │   │   └── bff-support.spec.ts
│   │   │       │   └── support
│   │   │       │       ├── global-setup.ts
│   │   │       │       ├── global-teardown.ts
│   │   │       │       └── test-setup.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.spec.json
│   │   └── wms
│   │       ├── app
│   │       │   ├── project.json
│   │       │   ├── src
│   │       │   │   ├── app
│   │       │   │   │   ├── app.controller.ts
│   │       │   │   │   ├── app.module.ts
│   │       │   │   │   ├── app.service.ts
│   │       │   │   │   ├── wms-api.module.ts
│   │       │   │   │   └── wms-inventory.controller.ts
│   │       │   │   ├── assets
│   │       │   │   │   └── .gitkeep
│   │       │   │   └── main.ts
│   │       │   ├── tsconfig.app.json
│   │       │   ├── tsconfig.json
│   │       │   └── webpack.config.js
│   │       └── e2e
│   │           ├── jest.config.cts
│   │           ├── project.json
│   │           ├── src
│   │           │   ├── bff-wms
│   │           │   │   └── bff-wms.spec.ts
│   │           │   └── support
│   │           │       ├── global-setup.ts
│   │           │       ├── global-teardown.ts
│   │           │       └── test-setup.ts
│   │           ├── tsconfig.json
│   │           └── tsconfig.spec.json
│   ├── service
│   │   ├── accounting
│   │   │   ├── app
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── jest.config.cts
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── app
│   │   │   │   │   │   ├── app.module.spec.ts
│   │   │   │   │   │   └── app.module.ts
│   │   │   │   │   ├── assets
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   └── main.ts
│   │   │   │   ├── tsconfig.app.json
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── webpack.config.js
│   │   │   └── e2e
│   │   │       ├── eslint.config.mjs
│   │   │       ├── jest.config.cts
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── support
│   │   │       │   │   ├── global-setup.ts
│   │   │       │   │   ├── global-teardown.ts
│   │   │       │   │   └── test-setup.ts
│   │   │       │   └── virtex-accounting-service
│   │   │       │       └── virtex-accounting-service.spec.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.spec.json
│   │   ├── admin
│   │   │   ├── app
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── jest.config.cts
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── app
│   │   │   │   │   │   ├── app.module.spec.ts
│   │   │   │   │   │   └── app.module.ts
│   │   │   │   │   ├── assets
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   └── main.ts
│   │   │   │   ├── tsconfig.app.json
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   ├── vitest.config.ts
│   │   │   │   └── webpack.config.js
│   │   │   └── e2e
│   │   │       ├── eslint.config.mjs
│   │   │       ├── jest.config.cts
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── support
│   │   │       │   │   ├── global-setup.ts
│   │   │       │   │   ├── global-teardown.ts
│   │   │       │   │   └── test-setup.ts
│   │   │       │   └── virtex-admin-service
│   │   │       │       ├── operations.spec.ts
│   │   │       │       └── virtex-admin-service.spec.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.spec.json
│   │   ├── api-access-gateway
│   │   │   ├── app
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── app
│   │   │   │   │   │   ├── app.controller.ts
│   │   │   │   │   │   ├── app.module.ts
│   │   │   │   │   │   └── app.service.ts
│   │   │   │   │   ├── assets
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   └── main.ts
│   │   │   │   ├── tsconfig.app.json
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── webpack.config.js
│   │   │   └── app-e2e
│   │   │       ├── jest.config.cts
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── api-access-gateway
│   │   │       │   │   └── api-access-gateway.spec.ts
│   │   │       │   └── support
│   │   │       │       ├── global-setup.ts
│   │   │       │       ├── global-teardown.ts
│   │   │       │       └── test-setup.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.spec.json
│   │   ├── authn-credential
│   │   │   ├── app
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── app
│   │   │   │   │   │   ├── app.controller.ts
│   │   │   │   │   │   ├── app.module.ts
│   │   │   │   │   │   └── app.service.ts
│   │   │   │   │   ├── assets
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   └── main.ts
│   │   │   │   ├── tsconfig.app.json
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── webpack.config.js
│   │   │   └── app-e2e
│   │   │       ├── jest.config.cts
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── authn-credential
│   │   │       │   │   └── authn-credential.spec.ts
│   │   │       │   └── support
│   │   │       │       ├── global-setup.ts
│   │   │       │       ├── global-teardown.ts
│   │   │       │       └── test-setup.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.spec.json
│   │   ├── authorization-policy
│   │   │   ├── app
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── app
│   │   │   │   │   │   ├── app.controller.ts
│   │   │   │   │   │   ├── app.module.ts
│   │   │   │   │   │   └── app.service.ts
│   │   │   │   │   ├── assets
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   └── main.ts
│   │   │   │   ├── tsconfig.app.json
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── webpack.config.js
│   │   │   └── app-e2e
│   │   │       ├── jest.config.cts
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── authorization-policy
│   │   │       │   │   └── authorization-policy.spec.ts
│   │   │       │   └── support
│   │   │       │       ├── global-setup.ts
│   │   │       │       ├── global-teardown.ts
│   │   │       │       └── test-setup.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.spec.json
│   │   ├── bi
│   │   │   ├── app
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── jest.config.cts
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── app
│   │   │   │   │   │   ├── app.module.spec.ts
│   │   │   │   │   │   └── app.module.ts
│   │   │   │   │   ├── assets
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   └── main.ts
│   │   │   │   ├── tsconfig.app.json
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   ├── vitest.config.ts
│   │   │   │   └── webpack.config.js
│   │   │   └── e2e
│   │   │       ├── eslint.config.mjs
│   │   │       ├── jest.config.cts
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── support
│   │   │       │   │   ├── global-setup.ts
│   │   │       │   │   ├── global-teardown.ts
│   │   │       │   │   └── test-setup.ts
│   │   │       │   └── virtex-bi-service
│   │   │       │       └── virtex-bi-service.spec.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.spec.json
│   │   ├── billing
│   │   │   ├── app
│   │   │   │   ├── jest.config.cts
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── app
│   │   │   │   │   │   ├── app.controller.ts
│   │   │   │   │   │   ├── app.module.spec.ts
│   │   │   │   │   │   ├── app.module.ts
│   │   │   │   │   │   ├── app.service.ts
│   │   │   │   │   │   ├── finops-cost.service.spec.ts
│   │   │   │   │   │   ├── ops-readiness.service.spec.ts
│   │   │   │   │   │   ├── ops-readiness.service.ts
│   │   │   │   │   │   ├── ops.controller.ts
│   │   │   │   │   │   └── seeds
│   │   │   │   │   │       └── initial-seeder.service.ts
│   │   │   │   │   ├── assets
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   └── main.ts
│   │   │   │   ├── tsconfig.app.json
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── webpack.config.js
│   │   │   └── e2e
│   │   │       ├── jest.config.cts
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── support
│   │   │       │   │   ├── global-setup.ts
│   │   │       │   │   ├── global-teardown.ts
│   │   │       │   │   └── test-setup.ts
│   │   │       │   └── virtex-billing-service
│   │   │       │       └── virtex-billing-service.spec.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.spec.json
│   │   ├── catalog
│   │   │   ├── app
│   │   │   │   ├── jest.config.ts
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── app
│   │   │   │   │   │   ├── app.controller.ts
│   │   │   │   │   │   ├── app.module.spec.ts
│   │   │   │   │   │   ├── app.module.ts
│   │   │   │   │   │   ├── app.service.ts
│   │   │   │   │   │   ├── catalog.resolver.spec.ts
│   │   │   │   │   │   └── schema.service.ts
│   │   │   │   │   ├── assets
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   └── main.ts
│   │   │   │   ├── tsconfig.app.json
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── webpack.config.js
│   │   │   └── e2e
│   │   │       ├── jest.config.cts
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── support
│   │   │       │   │   ├── global-setup.ts
│   │   │       │   │   ├── global-teardown.ts
│   │   │       │   │   └── test-setup.ts
│   │   │       │   └── virtex-catalog-service
│   │   │       │       └── virtex-catalog-service.spec.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.spec.json
│   │   ├── crm
│   │   │   └── app
│   │   │       ├── jest.config.cts
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── app
│   │   │       │   │   ├── app.controller.ts
│   │   │       │   │   ├── app.module.spec.ts
│   │   │       │   │   ├── app.module.ts
│   │   │       │   │   └── app.service.ts
│   │   │       │   └── main.ts
│   │   │       ├── tsconfig.app.json
│   │   │       ├── tsconfig.json
│   │   │       ├── tsconfig.spec.json
│   │   │       └── webpack.config.js
│   │   ├── fiscal
│   │   │   ├── app
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── jest.config.ts
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── app
│   │   │   │   │   │   ├── app.controller.spec.ts
│   │   │   │   │   │   ├── app.controller.ts
│   │   │   │   │   │   ├── app.module.ts
│   │   │   │   │   │   ├── app.service.spec.ts
│   │   │   │   │   │   ├── app.service.ts
│   │   │   │   │   │   ├── invoice.consumer.spec.ts
│   │   │   │   │   │   └── invoice.consumer.ts
│   │   │   │   │   ├── assets
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   └── main.ts
│   │   │   │   ├── tsconfig.app.json
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   ├── vitest.config.ts
│   │   │   │   └── webpack.config.js
│   │   │   └── e2e
│   │   │       ├── eslint.config.mjs
│   │   │       ├── jest.config.cts
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── support
│   │   │       │   │   ├── global-setup.ts
│   │   │       │   │   ├── global-teardown.ts
│   │   │       │   │   └── test-setup.ts
│   │   │       │   └── virtex-fiscal-connector
│   │   │       │       └── virtex-fiscal-connector.spec.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.spec.json
│   │   ├── fixed-assets
│   │   │   ├── app
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── jest.config.cts
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── app
│   │   │   │   │   │   ├── app.module.spec.ts
│   │   │   │   │   │   └── app.module.ts
│   │   │   │   │   ├── assets
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   └── main.ts
│   │   │   │   ├── tsconfig.app.json
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── webpack.config.js
│   │   │   └── e2e
│   │   │       ├── eslint.config.mjs
│   │   │       ├── jest.config.cts
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── support
│   │   │       │   │   ├── global-setup.ts
│   │   │       │   │   ├── global-teardown.ts
│   │   │       │   │   └── test-setup.ts
│   │   │       │   └── virtex-fixed-assets-service
│   │   │       │       └── virtex-fixed-assets-service.spec.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.spec.json
│   │   ├── gateway
│   │   │   └── app
│   │   │       └── src
│   │   │           └── migrations
│   │   │               └── Migration20250220_RLS.ts
│   │   ├── identity
│   │   │   ├── app
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── jest.config.cts
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── app
│   │   │   │   │   │   ├── app.controller.spec.ts
│   │   │   │   │   │   ├── app.controller.ts
│   │   │   │   │   │   ├── app.module.spec.ts
│   │   │   │   │   │   ├── app.module.ts
│   │   │   │   │   │   ├── app.service.spec.ts
│   │   │   │   │   │   ├── app.service.ts
│   │   │   │   │   │   ├── controllers
│   │   │   │   │   │   │   ├── admin.grpc.controller.ts
│   │   │   │   │   │   │   ├── auth.grpc.controller.ts
│   │   │   │   │   │   │   ├── localization.grpc.controller.ts
│   │   │   │   │   │   │   ├── onboarding.grpc.controller.ts
│   │   │   │   │   │   │   └── users.grpc.controller.ts
│   │   │   │   │   │   └── guards
│   │   │   │   │   │       ├── grpc-auth.guard.ts
│   │   │   │   │   │       └── rpc-aware-throttler.guard.ts
│   │   │   │   │   ├── assets
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   └── main.ts
│   │   │   │   ├── tsconfig.app.json
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── webpack.config.js
│   │   │   └── e2e
│   │   │       ├── eslint.config.mjs
│   │   │       ├── jest.config.cts
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── support
│   │   │       │   │   ├── global-setup.ts
│   │   │       │   │   ├── global-teardown.ts
│   │   │       │   │   └── test-setup.ts
│   │   │       │   └── virtex-auth-server
│   │   │       │       └── virtex-auth-server.spec.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.spec.json
│   │   ├── identity-audit-ledger
│   │   │   ├── app
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── app
│   │   │   │   │   │   ├── app.controller.ts
│   │   │   │   │   │   ├── app.module.ts
│   │   │   │   │   │   └── app.service.ts
│   │   │   │   │   ├── assets
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   └── main.ts
│   │   │   │   ├── tsconfig.app.json
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── webpack.config.js
│   │   │   └── app-e2e
│   │   │       ├── jest.config.cts
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── identity-audit-ledger
│   │   │       │   │   └── identity-audit-ledger.spec.ts
│   │   │       │   └── support
│   │   │       │       ├── global-setup.ts
│   │   │       │       ├── global-teardown.ts
│   │   │       │       └── test-setup.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.spec.json
│   │   ├── identity-profile
│   │   │   ├── app
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── app
│   │   │   │   │   │   ├── app.controller.ts
│   │   │   │   │   │   ├── app.module.ts
│   │   │   │   │   │   └── app.service.ts
│   │   │   │   │   ├── assets
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   └── main.ts
│   │   │   │   ├── tsconfig.app.json
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── webpack.config.js
│   │   │   └── app-e2e
│   │   │       ├── jest.config.cts
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── identity-profile
│   │   │       │   │   └── identity-profile.spec.ts
│   │   │       │   └── support
│   │   │       │       ├── global-setup.ts
│   │   │       │       ├── global-teardown.ts
│   │   │       │       └── test-setup.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.spec.json
│   │   ├── inventory
│   │   │   └── app
│   │   │       ├── eslint.config.mjs
│   │   │       ├── jest.config.cts
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── app
│   │   │       │   │   ├── app.controller.spec.ts
│   │   │       │   │   ├── app.controller.ts
│   │   │       │   │   ├── app.module.spec.ts
│   │   │       │   │   ├── app.module.ts
│   │   │       │   │   ├── app.service.spec.ts
│   │   │       │   │   └── app.service.ts
│   │   │       │   ├── assets
│   │   │       │   │   └── .gitkeep
│   │   │       │   └── main.ts
│   │   │       ├── tsconfig.app.json
│   │   │       ├── tsconfig.json
│   │   │       ├── tsconfig.spec.json
│   │   │       └── webpack.config.js
│   │   ├── manufacturing
│   │   │   ├── app
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── jest.config.cts
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── app
│   │   │   │   │   │   ├── app.module.spec.ts
│   │   │   │   │   │   └── app.module.ts
│   │   │   │   │   ├── assets
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   └── main.ts
│   │   │   │   ├── tsconfig.app.json
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── webpack.config.js
│   │   │   └── e2e
│   │   │       ├── eslint.config.mjs
│   │   │       ├── jest.config.cts
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── support
│   │   │       │   │   ├── global-setup.ts
│   │   │       │   │   ├── global-teardown.ts
│   │   │       │   │   └── test-setup.ts
│   │   │       │   └── virtex-manufacturing-service
│   │   │       │       └── virtex-manufacturing-service.spec.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.spec.json
│   │   ├── payroll
│   │   │   ├── app
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── jest.config.cts
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── app
│   │   │   │   │   │   ├── app.module.spec.ts
│   │   │   │   │   │   └── app.module.ts
│   │   │   │   │   ├── assets
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   └── main.ts
│   │   │   │   ├── tsconfig.app.json
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── webpack.config.js
│   │   │   └── e2e
│   │   │       ├── eslint.config.mjs
│   │   │       ├── jest.config.cts
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── support
│   │   │       │   │   ├── global-setup.ts
│   │   │       │   │   ├── global-teardown.ts
│   │   │       │   │   └── test-setup.ts
│   │   │       │   └── virtex-payroll-service
│   │   │       │       └── virtex-payroll-service.spec.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.spec.json
│   │   ├── plugin-host
│   │   │   └── app
│   │   │       ├── README.md
│   │   │       ├── eslint.config.mjs
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── assets
│   │   │       │   │   ├── .gitkeep
│   │   │       │   │   └── plugin.worker.js
│   │   │       │   ├── config
│   │   │       │   │   └── plugin-policy.config.ts
│   │   │       │   ├── main.ts
│   │   │       │   ├── sandbox.service.hardening.spec.ts
│   │   │       │   ├── sandbox.service.spec.ts
│   │   │       │   ├── sandbox.service.ts
│   │   │       │   ├── services
│   │   │       │   │   ├── billing.service.ts
│   │   │       │   │   ├── metering.service.ts
│   │   │       │   │   ├── plugin-admission.service.spec.ts
│   │   │       │   │   └── plugin-admission.service.ts
│   │   │       │   ├── test
│   │   │       │   │   └── mocks
│   │   │       │   │       └── isolated-vm.mock.ts
│   │   │       │   └── typings.d.ts
│   │   │       ├── tsconfig.app.json
│   │   │       ├── tsconfig.json
│   │   │       ├── tsconfig.spec.json
│   │   │       └── vitest.config.ts
│   │   ├── pos
│   │   │   └── app
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── app
│   │   │       │   │   ├── pos-api.module.ts
│   │   │       │   │   └── pos.controller.ts
│   │   │       │   └── main.ts
│   │   │       ├── tsconfig.app.json
│   │   │       ├── tsconfig.json
│   │   │       ├── tsconfig.spec.json
│   │   │       └── webpack.config.js
│   │   ├── projects
│   │   │   ├── app
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── jest.config.cts
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── app
│   │   │   │   │   │   ├── app.module.spec.ts
│   │   │   │   │   │   └── app.module.ts
│   │   │   │   │   ├── assets
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   └── main.ts
│   │   │   │   ├── tsconfig.app.json
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── webpack.config.js
│   │   │   └── e2e
│   │   │       ├── eslint.config.mjs
│   │   │       ├── jest.config.cts
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── support
│   │   │       │   │   ├── global-setup.ts
│   │   │       │   │   ├── global-teardown.ts
│   │   │       │   │   └── test-setup.ts
│   │   │       │   └── virtex-projects-service
│   │   │       │       └── virtex-projects-service.spec.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.spec.json
│   │   ├── provisioning-federation
│   │   │   ├── app
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── app
│   │   │   │   │   │   ├── app.controller.ts
│   │   │   │   │   │   ├── app.module.ts
│   │   │   │   │   │   └── app.service.ts
│   │   │   │   │   ├── assets
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   └── main.ts
│   │   │   │   ├── tsconfig.app.json
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── webpack.config.js
│   │   │   └── app-e2e
│   │   │       ├── jest.config.cts
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── provisioning-federation
│   │   │       │   │   └── provisioning-federation.spec.ts
│   │   │       │   └── support
│   │   │       │       ├── global-setup.ts
│   │   │       │       ├── global-teardown.ts
│   │   │       │       └── test-setup.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.spec.json
│   │   ├── purchasing
│   │   │   ├── app
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── jest.config.cts
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── app
│   │   │   │   │   │   ├── app.module.spec.ts
│   │   │   │   │   │   └── app.module.ts
│   │   │   │   │   ├── assets
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   └── main.ts
│   │   │   │   ├── tsconfig.app.json
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── webpack.config.js
│   │   │   └── e2e
│   │   │       ├── eslint.config.mjs
│   │   │       ├── jest.config.cts
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── support
│   │   │       │   │   ├── global-setup.ts
│   │   │       │   │   ├── global-teardown.ts
│   │   │       │   │   └── test-setup.ts
│   │   │       │   └── virtex-purchasing-service
│   │   │       │       └── virtex-purchasing-service.spec.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.spec.json
│   │   ├── risk-adaptive-auth
│   │   │   ├── app
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── app
│   │   │   │   │   │   ├── app.controller.ts
│   │   │   │   │   │   ├── app.module.ts
│   │   │   │   │   │   └── app.service.ts
│   │   │   │   │   ├── assets
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   └── main.ts
│   │   │   │   ├── tsconfig.app.json
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── webpack.config.js
│   │   │   └── app-e2e
│   │   │       ├── jest.config.cts
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── risk-adaptive-auth
│   │   │       │   │   └── risk-adaptive-auth.spec.ts
│   │   │       │   └── support
│   │   │       │       ├── global-setup.ts
│   │   │       │       ├── global-teardown.ts
│   │   │       │       └── test-setup.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.spec.json
│   │   ├── session
│   │   │   ├── app
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── app
│   │   │   │   │   │   ├── app.controller.ts
│   │   │   │   │   │   ├── app.module.ts
│   │   │   │   │   │   └── app.service.ts
│   │   │   │   │   ├── assets
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   └── main.ts
│   │   │   │   ├── tsconfig.app.json
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── webpack.config.js
│   │   │   └── app-e2e
│   │   │       ├── jest.config.cts
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── session
│   │   │       │   │   └── session.spec.ts
│   │   │       │   └── support
│   │   │       │       ├── global-setup.ts
│   │   │       │       ├── global-teardown.ts
│   │   │       │       └── test-setup.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.spec.json
│   │   ├── subscription
│   │   │   └── app
│   │   │       ├── jest.config.cts
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── app
│   │   │       │   │   ├── app.controller.ts
│   │   │       │   │   ├── app.module.spec.ts
│   │   │       │   │   ├── app.module.ts
│   │   │       │   │   └── app.service.ts
│   │   │       │   ├── assets
│   │   │       │   │   └── .gitkeep
│   │   │       │   └── main.ts
│   │   │       ├── tsconfig.app.json
│   │   │       ├── tsconfig.json
│   │   │       ├── tsconfig.spec.json
│   │   │       └── webpack.config.js
│   │   ├── token
│   │   │   ├── app
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── app
│   │   │   │   │   │   ├── app.controller.ts
│   │   │   │   │   │   ├── app.module.ts
│   │   │   │   │   │   └── app.service.ts
│   │   │   │   │   ├── assets
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   └── main.ts
│   │   │   │   ├── tsconfig.app.json
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── webpack.config.js
│   │   │   └── app-e2e
│   │   │       ├── jest.config.cts
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── support
│   │   │       │   │   ├── global-setup.ts
│   │   │       │   │   ├── global-teardown.ts
│   │   │       │   │   └── test-setup.ts
│   │   │       │   └── token
│   │   │       │       └── token.spec.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.spec.json
│   │   └── treasury
│   │       ├── app
│   │       │   ├── eslint.config.mjs
│   │       │   ├── jest.config.cts
│   │       │   ├── project.json
│   │       │   ├── src
│   │       │   │   ├── app
│   │       │   │   │   ├── app.module.spec.ts
│   │       │   │   │   └── app.module.ts
│   │       │   │   ├── assets
│   │       │   │   │   └── .gitkeep
│   │       │   │   └── main.ts
│   │       │   ├── tsconfig.app.json
│   │       │   ├── tsconfig.json
│   │       │   ├── tsconfig.spec.json
│   │       │   └── webpack.config.js
│   │       └── e2e
│   │           ├── eslint.config.mjs
│   │           ├── jest.config.cts
│   │           ├── project.json
│   │           ├── src
│   │           │   ├── support
│   │           │   │   ├── global-setup.ts
│   │           │   │   ├── global-teardown.ts
│   │           │   │   └── test-setup.ts
│   │           │   └── virtex-treasury-service
│   │           │       └── virtex-treasury-service.spec.ts
│   │           ├── tsconfig.json
│   │           └── tsconfig.spec.json
│   └── worker
│       ├── notification
│       │   ├── app
│       │   │   ├── jest.config.ts
│       │   │   ├── project.json
│       │   │   ├── src
│       │   │   │   ├── app
│       │   │   │   │   ├── app.controller.ts
│       │   │   │   │   ├── app.module.ts
│       │   │   │   │   ├── app.service.spec.ts
│       │   │   │   │   ├── app.service.ts
│       │   │   │   │   ├── notification.consumer.spec.ts
│       │   │   │   │   └── notification.consumer.ts
│       │   │   │   ├── assets
│       │   │   │   │   └── .gitkeep
│       │   │   │   └── main.ts
│       │   │   ├── tsconfig.app.json
│       │   │   ├── tsconfig.json
│       │   │   ├── tsconfig.spec.json
│       │   │   └── webpack.config.js
│       │   └── e2e
│       │       ├── jest.config.cts
│       │       ├── project.json
│       │       ├── src
│       │       │   ├── support
│       │       │   │   ├── global-setup.ts
│       │       │   │   ├── global-teardown.ts
│       │       │   │   └── test-setup.ts
│       │       │   └── virtex-notification-service
│       │       │       └── virtex-notification-service.spec.ts
│       │       ├── tsconfig.json
│       │       └── tsconfig.spec.json
│       └── scheduler
│           ├── app
│           │   ├── README.md
│           │   ├── eslint.config.mjs
│           │   ├── jest.config.cts
│           │   ├── project.json
│           │   ├── src
│           │   │   ├── app
│           │   │   │   ├── app.controller.spec.ts
│           │   │   │   ├── app.controller.ts
│           │   │   │   ├── app.module.ts
│           │   │   │   ├── app.service.spec.ts
│           │   │   │   └── app.service.ts
│           │   │   ├── assets
│           │   │   │   └── .gitkeep
│           │   │   └── main.ts
│           │   ├── tsconfig.app.json
│           │   ├── tsconfig.json
│           │   ├── tsconfig.spec.json
│           │   └── webpack.config.js
│           └── e2e
│               ├── eslint.config.mjs
│               ├── jest.config.cts
│               ├── project.json
│               ├── src
│               │   ├── support
│               │   │   ├── global-setup.ts
│               │   │   ├── global-teardown.ts
│               │   │   └── test-setup.ts
│               │   └── virtex-jobs
│               │       └── virtex-jobs.spec.ts
│               ├── tsconfig.json
│               └── tsconfig.spec.json
├── artifacts
│   └── poc-results
│       ├── placeholder
│       ├── plugin-security.json
│       ├── poc-a-rls-scale.json
│       ├── poc-a-rls-scale.md
│       ├── poc-b-offline-sync-network-chaos.json
│       ├── poc-b-offline-sync-network-chaos.md
│       ├── poc-c-plugin-isolation-revocation.json
│       ├── poc-c-plugin-isolation-revocation.md
│       └── rls-load-test.json
├── config
│   ├── governance
│   │   ├── backend-test-policy.json
│   │   ├── e2e-policy.json
│   │   ├── entitlement-matrix.json
│   │   ├── naming-policy.json
│   │   └── tag-catalog.json
│   ├── operations
│   │   ├── dr-schedule.enterprise.json
│   │   └── regional-health-inventory.json
│   └── readiness
│       ├── commercial-eligibility.matrix.json
│       └── operational-readiness.sot.json
├── docker-compose.yml
├── docs
│   ├── AUDIT_REMEDIATION_REPORT.md
│   ├── MONOREPO_MAP.md
│   ├── adr
│   │   ├── 0001-consolidated-infrastructure.md
│   │   ├── 0002-domain-contracts.md
│   │   └── 0003-product-core-platform-shells.md
│   ├── architecture
│   │   ├── ESTANDAR_MIGRACION_MICROSERVICIOS.md
│   │   ├── GUIA_MIGRACION_DOMINIOS_V2.md
│   │   ├── LEVEL_5_READINESS_REPORT.md
│   │   ├── bff-migration-matrix.md
│   │   ├── billing-ops-architecture-remediation.md
│   │   ├── inventory-fixed-assets-remediation.md
│   │   └── production-readiness-hardening.md
│   ├── commercial
│   │   ├── country-module-readiness-matrix.md
│   │   ├── module-maturity-matrix.md
│   │   ├── packaging-and-plan-limits.md
│   │   └── release-trust-packet.md
│   ├── compliance
│   │   └── trust-center-base.md
│   ├── final-readiness-report.md
│   ├── fiscal
│   │   ├── br-co-homologation-checklist.md
│   │   ├── certificate-onboarding-flow.md
│   │   ├── country-provider-matrix.md
│   │   └── us-partner-readiness.md
│   ├── governance
│   │   ├── LEVEL5_FEDERATION_REPORT.md
│   │   └── source-of-truth.md
│   ├── infra
│   │   └── hardening.md
│   ├── nx-governance.md
│   ├── operations
│   │   ├── critical-e2e-matrix.md
│   │   ├── mobile-offline-security.md
│   │   ├── onboarding
│   │   │   ├── BR-fiscal.md
│   │   │   └── MX-fiscal.md
│   │   ├── pt-BR
│   │   │   └── support-l1-checklist.md
│   │   ├── runbooks
│   │   │   ├── disaster-recovery-drills.md
│   │   │   ├── plugin-quarantine.md
│   │   │   └── plugin-revocation.md
│   │   ├── service-topology-catalog.md
│   │   ├── slo-observability-catalog.md
│   │   ├── support-l1-l2-l3-runbook.md
│   │   ├── workers-runbook.md
│   │   └── workers-slos.md
│   ├── readiness
│   │   ├── READINESS_GOVERNANCE.md
│   │   └── poc-execution-matrix.md
│   ├── readiness-gap-analysis.md
│   ├── remediation
│   │   └── REMEDIATION_SCORECARD.md
│   ├── remediation-roadmap.md
│   ├── runbooks
│   │   ├── federation-incidents.md
│   │   └── slo-incident-response.md
│   ├── security
│   │   ├── enterprise-hardening-remediation.md
│   │   └── marketplace-compliance-report.md
│   └── tenant-enforcement-inventory.md
├── eslint.config.mjs
├── identity.sqlite3
├── jest.preset.js
├── libs
│   ├── domain
│   │   ├── accounting
│   │   │   ├── CHANGELOG.md
│   │   │   ├── OWNERS
│   │   │   ├── README.md
│   │   │   ├── application
│   │   │   │   ├── OWNERS
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── jest.config.cts
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── application.public-api.ts
│   │   │   │   │   ├── facades
│   │   │   │   │   │   ├── accounting-command.facade.ts
│   │   │   │   │   │   └── accounting-query.facade.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── mappers
│   │   │   │   │   │   ├── account.mapper.ts
│   │   │   │   │   │   └── journal-entry.mapper.ts
│   │   │   │   │   ├── ports
│   │   │   │   │   │   ├── inbound
│   │   │   │   │   │   │   └── accounting-event-consumer.port.ts
│   │   │   │   │   │   ├── logger.port.ts
│   │   │   │   │   │   └── outbound
│   │   │   │   │   │       ├── message-broker.port.ts
│   │   │   │   │   │       └── unit-of-work.port.ts
│   │   │   │   │   ├── services
│   │   │   │   │   │   ├── accounting-event-handler.service.ts
│   │   │   │   │   │   ├── accounting-policy.service.ts
│   │   │   │   │   │   └── dimension-validator.service.ts
│   │   │   │   │   └── use-cases
│   │   │   │   │       ├── accounts
│   │   │   │   │       │   ├── create-account.use-case.spec.ts
│   │   │   │   │       │   ├── create-account.use-case.ts
│   │   │   │   │       │   ├── get-accounts-by-ids.use-case.ts
│   │   │   │   │       │   ├── get-accounts.use-case.ts
│   │   │   │   │       │   └── setup-chart-of-accounts.use-case.ts
│   │   │   │   │       ├── bank
│   │   │   │   │       │   ├── bank-reconciliation.use-case.spec.ts
│   │   │   │   │       │   └── bank-reconciliation.use-case.ts
│   │   │   │   │       ├── consolidation
│   │   │   │   │       │   └── consolidate-accounts.use-case.ts
│   │   │   │   │       ├── fiscal-periods
│   │   │   │   │       │   ├── close-fiscal-period.use-case.spec.ts
│   │   │   │   │       │   └── close-fiscal-period.use-case.ts
│   │   │   │   │       ├── journal-entries
│   │   │   │   │       │   ├── count-journal-entries.use-case.ts
│   │   │   │   │       │   ├── get-journal-entries.use-case.ts
│   │   │   │   │       │   ├── record-journal-entry.use-case.spec.ts
│   │   │   │   │       │   └── record-journal-entry.use-case.ts
│   │   │   │   │       ├── metrics
│   │   │   │   │       │   └── get-monthly-opex.use-case.ts
│   │   │   │   │       ├── reports
│   │   │   │   │       │   ├── generate-financial-report.use-case.hardening.spec.ts
│   │   │   │   │       │   ├── generate-financial-report.use-case.spec.ts
│   │   │   │   │       │   └── generate-financial-report.use-case.ts
│   │   │   │   │       └── subledgers
│   │   │   │   │           ├── record-invoice.use-case.spec.ts
│   │   │   │   │           ├── record-invoice.use-case.ts
│   │   │   │   │           ├── record-payment.use-case.spec.ts
│   │   │   │   │           └── record-payment.use-case.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   ├── vitest.config.ts
│   │   │   │   └── vitest.setup.ts
│   │   │   ├── contracts
│   │   │   │   ├── OWNERS
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── jest.config.cts
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── api
│   │   │   │   │   │   ├── v1
│   │   │   │   │   │   │   ├── requests
│   │   │   │   │   │   │   │   ├── accounting-ops.dto.ts
│   │   │   │   │   │   │   │   ├── create-account.dto.ts
│   │   │   │   │   │   │   │   ├── invoice.dto.ts
│   │   │   │   │   │   │   │   ├── payment.dto.ts
│   │   │   │   │   │   │   │   └── record-journal-entry.dto.ts
│   │   │   │   │   │   │   └── responses
│   │   │   │   │   │   │       ├── account.dto.ts
│   │   │   │   │   │   │       ├── financial-report.dto.ts
│   │   │   │   │   │   │       └── journal-entry.dto.ts
│   │   │   │   │   │   └── v2
│   │   │   │   │   │       └── responses
│   │   │   │   │   │           ├── account.v2.dto.ts
│   │   │   │   │   │           └── journal-entry.v2.dto.ts
│   │   │   │   │   ├── compatibility
│   │   │   │   │   │   └── v1-to-v2.mapper.ts
│   │   │   │   │   ├── core
│   │   │   │   │   │   ├── accounting-ops.interface.ts
│   │   │   │   │   │   └── create-account.interface.ts
│   │   │   │   │   ├── errors
│   │   │   │   │   │   └── integration.error.ts
│   │   │   │   │   ├── events
│   │   │   │   │   │   ├── accounting-integration.events.ts
│   │   │   │   │   │   └── v1
│   │   │   │   │   │       └── account-created.event.ts
│   │   │   │   │   ├── index.spec.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── integration
│   │   │   │   │   │   └── reporting.port.ts
│   │   │   │   │   └── shared
│   │   │   │   │       ├── account.model.ts
│   │   │   │   │       ├── enums
│   │   │   │   │       │   ├── account-type.enum.ts
│   │   │   │   │       │   ├── financial-report-type.enum.ts
│   │   │   │   │       │   ├── journal-entry-status.enum.ts
│   │   │   │   │       │   └── journal-entry-type.enum.ts
│   │   │   │   │       ├── flattened-account.model.ts
│   │   │   │   │       ├── general-ledger.model.ts
│   │   │   │   │       ├── journal-entry.model.ts
│   │   │   │   │       ├── journal.model.ts
│   │   │   │   │       └── ledger.model.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   └── tsconfig.spec.json
│   │   │   ├── docs
│   │   │   │   ├── adr
│   │   │   │   │   ├── 0001-outbox-pattern.md
│   │   │   │   │   ├── 0002-contract-versioning.md
│   │   │   │   │   ├── 0003-tenancy-enforcement.md
│   │   │   │   │   └── 003-functional-organization.md
│   │   │   │   └── migration-guide.md
│   │   │   ├── domain
│   │   │   │   ├── OWNERS
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── domain-services
│   │   │   │   │   │   ├── currency-revaluation.service.spec.ts
│   │   │   │   │   │   └── currency-revaluation.service.ts
│   │   │   │   │   ├── entities
│   │   │   │   │   │   ├── account.entity.ts
│   │   │   │   │   │   ├── accounting-policy.entity.ts
│   │   │   │   │   │   ├── audit-log.entity.ts
│   │   │   │   │   │   ├── bank-reconciliation.entity.ts
│   │   │   │   │   │   ├── bank-statement-line.entity.ts
│   │   │   │   │   │   ├── closing-task.entity.ts
│   │   │   │   │   │   ├── financial-report-snapshot.entity.ts
│   │   │   │   │   │   ├── fiscal-period.entity.ts
│   │   │   │   │   │   ├── fiscal-year.entity.ts
│   │   │   │   │   │   ├── invoice.entity.ts
│   │   │   │   │   │   ├── journal-entry-line.entity.ts
│   │   │   │   │   │   ├── journal-entry.entity.ts
│   │   │   │   │   │   └── payment.entity.ts
│   │   │   │   │   ├── errors
│   │   │   │   │   │   └── accounting.errors.ts
│   │   │   │   │   ├── events
│   │   │   │   │   │   ├── account-created.event.ts
│   │   │   │   │   │   └── domain-event.interface.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── repository-ports
│   │   │   │   │   │   ├── account.repository.ts
│   │   │   │   │   │   ├── accounts-payable.repository.ts
│   │   │   │   │   │   ├── accounts-receivable.repository.ts
│   │   │   │   │   │   ├── audit-log.repository.ts
│   │   │   │   │   │   ├── bank-reconciliation.repository.ts
│   │   │   │   │   │   ├── closing-task.repository.ts
│   │   │   │   │   │   ├── financial-report-snapshot.repository.ts
│   │   │   │   │   │   ├── fiscal-period.repository.ts
│   │   │   │   │   │   ├── journal-entry.repository.ts
│   │   │   │   │   │   └── policy.repository.ts
│   │   │   │   │   └── value-objects
│   │   │   │   │       ├── account-type.enum.ts
│   │   │   │   │       ├── journal-entry-status.enum.ts
│   │   │   │   │       ├── journal-entry-type.enum.ts
│   │   │   │   │       └── money.vo.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── infrastructure
│   │   │   │   ├── OWNERS
│   │   │   │   ├── README.md
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── accounting-application-wiring.module.ts
│   │   │   │   │   ├── accounting-infrastructure.module.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── messaging
│   │   │   │   │   │   ├── consumers
│   │   │   │   │   │   │   └── accounting-event-consumer.service.ts
│   │   │   │   │   │   ├── outbox
│   │   │   │   │   │   │   └── outbox-relay.service.ts
│   │   │   │   │   │   └── producers
│   │   │   │   │   │       └── kafka-message-broker.ts
│   │   │   │   │   └── persistence
│   │   │   │   │       ├── orm
│   │   │   │   │       │   ├── mikro-orm.config.ts
│   │   │   │   │       │   ├── mikro-orm.schemas.ts
│   │   │   │   │       │   └── outbox.schema.ts
│   │   │   │   │       └── repositories
│   │   │   │   │           ├── account-integration.spec.ts
│   │   │   │   │           ├── account.repository.spec.ts
│   │   │   │   │           ├── journal-entry-repository-adapter.ts
│   │   │   │   │           ├── mikro-orm-account.repository.ts
│   │   │   │   │           ├── mikro-orm-accounts-payable.repository.ts
│   │   │   │   │           ├── mikro-orm-accounts-receivable.repository.ts
│   │   │   │   │           ├── mikro-orm-audit-log.repository.ts
│   │   │   │   │           ├── mikro-orm-bank-reconciliation.repository.ts
│   │   │   │   │           ├── mikro-orm-closing-task.repository.ts
│   │   │   │   │           ├── mikro-orm-financial-report-snapshot.repository.ts
│   │   │   │   │           ├── mikro-orm-fiscal-period.repository.ts
│   │   │   │   │           ├── mikro-orm-journal-entry.repository.spec.ts
│   │   │   │   │           ├── mikro-orm-outbox.repository.ts
│   │   │   │   │           ├── mikro-orm-policy.repository.ts
│   │   │   │   │           ├── mikro-orm-reporting-adapter.ts
│   │   │   │   │           └── mikro-orm-unit-of-work-adapter.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── presentation
│   │   │   │   ├── OWNERS
│   │   │   │   ├── README.md
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── accounting-presentation.module.ts
│   │   │   │   │   ├── events
│   │   │   │   │   │   └── accounting.listener.ts
│   │   │   │   │   ├── filters
│   │   │   │   │   │   └── accounting-exception.filter.ts
│   │   │   │   │   ├── graphql
│   │   │   │   │   │   ├── account.loader.ts
│   │   │   │   │   │   ├── accounts.resolver.ts
│   │   │   │   │   │   └── journal-entries.resolver.ts
│   │   │   │   │   ├── guards
│   │   │   │   │   │   ├── capability.guard.ts
│   │   │   │   │   │   └── requires-capability.decorator.ts
│   │   │   │   │   ├── http
│   │   │   │   │   │   ├── controllers
│   │   │   │   │   │   │   ├── accounting-events.controller.ts
│   │   │   │   │   │   │   ├── accounting-health.controller.ts
│   │   │   │   │   │   │   ├── accounting-internal.controller.spec.ts
│   │   │   │   │   │   │   ├── accounting-internal.controller.ts
│   │   │   │   │   │   │   ├── accounting.controller.spec.ts
│   │   │   │   │   │   │   └── accounting.controller.ts
│   │   │   │   │   │   └── dto
│   │   │   │   │   │       ├── account.object.ts
│   │   │   │   │   │       ├── create-account.input.ts
│   │   │   │   │   │       ├── journal-entry-line.object.ts
│   │   │   │   │   │       ├── journal-entry.object.ts
│   │   │   │   │   │       └── record-journal-entry.input.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── interceptors
│   │   │   │   │   │   └── presentation-logging.interceptor.ts
│   │   │   │   │   └── modules
│   │   │   │   │       ├── accounting-events.module.ts
│   │   │   │   │       └── accounting-rest.module.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── project.json
│   │   │   ├── testing
│   │   │   │   ├── architecture
│   │   │   │   │   └── boundaries.spec.ts
│   │   │   │   ├── contract
│   │   │   │   │   ├── api-contracts.spec.ts
│   │   │   │   │   ├── journal-entry-dto.contract.spec.ts
│   │   │   │   │   └── kafka-topic.contract.spec.ts
│   │   │   │   ├── project.json
│   │   │   │   ├── security
│   │   │   │   │   └── security.spec.ts
│   │   │   │   ├── src
│   │   │   │   │   └── index.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── unit-benchmark-synthetic
│   │   │   │   │   ├── accounting.integration-benchmark-simulated.spec.ts
│   │   │   │   │   └── load-benchmark-simulated.spec.ts
│   │   │   │   ├── vitest.config.ts
│   │   │   │   └── vitest.setup.ts
│   │   │   └── ui
│   │   │       ├── package.json
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── directives
│   │   │       │   │   └── has-capability.directive.ts
│   │   │       │   ├── facades
│   │   │       │   │   └── accounting.facade.ts
│   │   │       │   ├── forms
│   │   │       │   │   └── account.form.ts
│   │   │       │   ├── i18n
│   │   │       │   │   ├── en.json
│   │   │       │   │   └── es.json
│   │   │       │   ├── index.ts
│   │   │       │   ├── lib.routes.ts
│   │   │       │   ├── pages
│   │   │       │   │   ├── chart-of-accounts
│   │   │       │   │   │   ├── chart-of-accounts.component.html
│   │   │       │   │   │   ├── chart-of-accounts.component.scss
│   │   │       │   │   │   ├── chart-of-accounts.component.ts
│   │   │       │   │   │   ├── create-account.component.html
│   │   │       │   │   │   ├── create-account.component.scss
│   │   │       │   │   │   └── create-account.component.ts
│   │   │       │   │   ├── dashboard
│   │   │       │   │   │   ├── dashboard.component.html
│   │   │       │   │   │   ├── dashboard.component.scss
│   │   │       │   │   │   └── dashboard.component.ts
│   │   │       │   │   ├── financial-reports
│   │   │       │   │   │   ├── financial-reports.component.html
│   │   │       │   │   │   ├── financial-reports.component.scss
│   │   │       │   │   │   └── financial-reports.component.ts
│   │   │       │   │   ├── fiscal-closing
│   │   │       │   │   │   ├── fiscal-closing.component.html
│   │   │       │   │   │   ├── fiscal-closing.component.scss
│   │   │       │   │   │   └── fiscal-closing.component.ts
│   │   │       │   │   └── journal-entries
│   │   │       │   │       ├── journal-entries.component.html
│   │   │       │   │       ├── journal-entries.component.scss
│   │   │       │   │       ├── journal-entries.component.ts
│   │   │       │   │       ├── record-journal-entry.component.html
│   │   │       │   │       ├── record-journal-entry.component.scss
│   │   │       │   │       └── record-journal-entry.component.ts
│   │   │       │   ├── services
│   │   │       │   │   ├── accounting.service.spec.ts
│   │   │       │   │   ├── accounting.service.ts
│   │   │       │   │   └── finance-dashboard.service.ts
│   │   │       │   ├── state
│   │   │       │   │   └── accounting.state.ts
│   │   │       │   ├── test-setup.ts
│   │   │       │   └── utils
│   │   │       │       └── error-mapper.ts
│   │   │       ├── tsconfig.json
│   │   │       ├── tsconfig.lib.json
│   │   │       └── vitest.config.ts
│   │   ├── admin
│   │   │   ├── CHANGELOG.md
│   │   │   ├── OWNERS
│   │   │   ├── README.md
│   │   │   ├── application
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── admin-application.module.ts
│   │   │   │   │   ├── admin-application.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── services
│   │   │   │   │   │   ├── admin-dashboard.service.ts
│   │   │   │   │   │   ├── data-import.service.ts
│   │   │   │   │   │   ├── incident.service.ts
│   │   │   │   │   │   ├── operations-read-model.service.ts
│   │   │   │   │   │   └── tenant-support.service.ts
│   │   │   │   │   └── use-cases
│   │   │   │   │       ├── provisioning-validation.spec.ts
│   │   │   │   │       ├── provisioning.service.ts
│   │   │   │   │       └── update-config.use-case.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── contracts
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── shared
│   │   │   │   │       └── admin-contracts.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── docs
│   │   │   │   └── migration-guide.md
│   │   │   ├── domain
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── admin-domain.spec.ts
│   │   │   │   │   ├── admin-domain.ts
│   │   │   │   │   ├── entities
│   │   │   │   │   │   ├── incident.entity.ts
│   │   │   │   │   │   └── tenant-config.entity.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── repository-ports
│   │   │   │   │       ├── dashboard.gateway.ts
│   │   │   │   │       ├── database.port.ts
│   │   │   │   │       ├── incident.repository.ts
│   │   │   │   │       ├── integration-gateway.port.ts
│   │   │   │   │       └── tenant-config.repository.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── infrastructure
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── admin-infrastructure.spec.ts
│   │   │   │   │   ├── admin-infrastructure.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── integrations
│   │   │   │   │   │   └── adapters
│   │   │   │   │   │       ├── http-dashboard.gateway.ts
│   │   │   │   │   │       └── http-integration.adapter.ts
│   │   │   │   │   ├── persistence
│   │   │   │   │   │   ├── entities
│   │   │   │   │   │   │   ├── incident.entity.ts
│   │   │   │   │   │   │   └── tenant-config.entity.ts
│   │   │   │   │   │   └── repositories
│   │   │   │   │   │       ├── mikro-orm-incident.repository.ts
│   │   │   │   │   │       └── mikro-orm-tenant-config.repository.ts
│   │   │   │   │   └── tenancy
│   │   │   │   │       └── mikro-orm-database.adapter.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── presentation
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── admin-presentation.module.ts
│   │   │   │   │   ├── admin-presentation.spec.ts
│   │   │   │   │   ├── admin-presentation.ts
│   │   │   │   │   ├── http
│   │   │   │   │   │   └── controllers
│   │   │   │   │   │       ├── admin-dashboard.controller.ts
│   │   │   │   │   │       ├── admin.controller.ts
│   │   │   │   │   │       ├── incidents.controller.ts
│   │   │   │   │   │       ├── monitoring.controller.ts
│   │   │   │   │   │       ├── operations.controller.ts
│   │   │   │   │   │       ├── security.controller.ts
│   │   │   │   │   │       └── tenants.controller.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   └── ui
│   │   │       ├── package.json
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── components
│   │   │       │   │   └── onboarding-wizard
│   │   │       │   │       └── onboarding-wizard.component.ts
│   │   │       │   ├── index.ts
│   │   │       │   └── lib.routes.ts
│   │   │       ├── tsconfig.json
│   │   │       ├── tsconfig.lib.json
│   │   │       └── vitest.config.ts
│   │   ├── api-access-gateway
│   │   │   ├── application
│   │   │   │   ├── README.md
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       └── domain-api-access-gateway-application.module.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   ├── contracts
│   │   │   │   ├── README.md
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       └── domain-api-access-gateway-contracts.module.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   ├── domain
│   │   │   │   ├── README.md
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       └── domain-api-access-gateway-domain.module.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   ├── infrastructure
│   │   │   │   ├── README.md
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── authn-credential-service.client.ts
│   │   │   │   │       └── domain-api-access-gateway-infrastructure.module.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   └── presentation
│   │   │       ├── README.md
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── index.ts
│   │   │       │   └── lib
│   │   │       │       ├── auth-session.controller.ts
│   │   │       │       └── domain-api-access-gateway-presentation.module.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.lib.json
│   │   ├── authn-credential
│   │   │   ├── application
│   │   │   │   ├── README.md
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── domain-authn-credential-application.module.ts
│   │   │   │   │       └── login-user.use-case.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   ├── contracts
│   │   │   │   ├── README.md
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       └── domain-authn-credential-contracts.module.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   ├── domain
│   │   │   │   ├── README.md
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── credential.entity.ts
│   │   │   │   │       └── domain-authn-credential-domain.module.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   ├── infrastructure
│   │   │   │   ├── README.md
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── domain-authn-credential-infrastructure.module.ts
│   │   │   │   │       ├── identity-service.client.ts
│   │   │   │   │       ├── outbox.repository.ts
│   │   │   │   │       └── token-service.client.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   └── presentation
│   │   │       ├── README.md
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── index.ts
│   │   │       │   └── lib
│   │   │       │       ├── authn-credential.grpc.controller.ts
│   │   │       │       └── domain-authn-credential-presentation.module.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.lib.json
│   │   ├── authorization-policy
│   │   │   ├── application
│   │   │   │   ├── README.md
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── domain-authorization-policy-application.module.ts
│   │   │   │   │       └── evaluate-policy.use-case.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   ├── contracts
│   │   │   │   ├── README.md
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       └── domain-authorization-policy-contracts.module.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   ├── domain
│   │   │   │   ├── README.md
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       └── domain-authorization-policy-domain.module.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   ├── infrastructure
│   │   │   │   ├── README.md
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       └── domain-authorization-policy-infrastructure.module.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   └── presentation
│   │   │       ├── README.md
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── index.ts
│   │   │       │   └── lib
│   │   │       │       └── domain-authorization-policy-presentation.module.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.lib.json
│   │   ├── bi
│   │   │   ├── CHANGELOG.md
│   │   │   ├── OWNERS
│   │   │   ├── README.md
│   │   │   ├── application
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── bi-application.module.ts
│   │   │   │   │   ├── dto
│   │   │   │   │   │   └── generate-report.dto.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── use-cases
│   │   │   │   │       ├── commands
│   │   │   │   │       │   └── generate-report
│   │   │   │   │       │       ├── generate-report.command.ts
│   │   │   │   │       │       └── generate-report.handler.ts
│   │   │   │   │       └── queries
│   │   │   │   │           ├── get-ar-aging
│   │   │   │   │           │   ├── get-ar-aging.handler.ts
│   │   │   │   │           │   └── get-ar-aging.query.ts
│   │   │   │   │           ├── get-dashboard-stats
│   │   │   │   │           │   ├── get-dashboard-stats.handler.ts
│   │   │   │   │           │   └── get-dashboard-stats.query.ts
│   │   │   │   │           ├── get-expenses
│   │   │   │   │           │   ├── get-expenses.handler.ts
│   │   │   │   │           │   └── get-expenses.query.ts
│   │   │   │   │           ├── get-invoice-status
│   │   │   │   │           │   ├── get-invoice-status.handler.ts
│   │   │   │   │           │   └── get-invoice-status.query.ts
│   │   │   │   │           └── get-top-products
│   │   │   │   │               ├── get-top-products.handler.ts
│   │   │   │   │               └── get-top-products.query.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── contracts
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── api
│   │   │   │   │   │   └── v1
│   │   │   │   │   │       ├── requests
│   │   │   │   │   │       │   └── generate-report.request.ts
│   │   │   │   │   │       └── responses
│   │   │   │   │   │           ├── bi-report.response.ts
│   │   │   │   │   │           └── dashboard-stats.response.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── docs
│   │   │   │   └── migration-guide.md
│   │   │   ├── domain
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── entities
│   │   │   │   │   │   └── bi-report.entity.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── repository-ports
│   │   │   │   │       ├── bi-accounting.port.ts
│   │   │   │   │       ├── bi-report.repository.ts
│   │   │   │   │       ├── catalog.port.ts
│   │   │   │   │       ├── crm.port.ts
│   │   │   │   │       ├── dashboard-gateway.port.ts
│   │   │   │   │       ├── expenses.port.ts
│   │   │   │   │       ├── invoice.port.ts
│   │   │   │   │       ├── purchasing.port.ts
│   │   │   │   │       ├── sales.port.ts
│   │   │   │   │       └── treasury.port.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── infrastructure
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── bi-infrastructure.module.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── integrations
│   │   │   │   │   │   └── adapters
│   │   │   │   │   │       ├── accounting-reporting.adapter.ts
│   │   │   │   │   │       ├── bi-expenses.adapter.ts
│   │   │   │   │   │       ├── bi-invoice.adapter.ts
│   │   │   │   │   │       ├── crm-sales.adapter.ts
│   │   │   │   │   │       ├── sql-bi-accounting.adapter.ts
│   │   │   │   │   │       ├── sql-catalog.adapter.ts
│   │   │   │   │   │       ├── sql-crm.adapter.ts
│   │   │   │   │   │       ├── sql-dashboard-gateway.adapter.ts
│   │   │   │   │   │       ├── sql-purchasing.adapter.ts
│   │   │   │   │   │       └── sql-treasury.adapter.ts
│   │   │   │   │   └── persistence
│   │   │   │   │       ├── bi-report.orm-entity.ts
│   │   │   │   │       └── repositories
│   │   │   │   │           └── mikro-orm-bi-report.repository.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── presentation
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── bi-presentation.module.ts
│   │   │   │   │   ├── http
│   │   │   │   │   │   └── controllers
│   │   │   │   │   │       ├── bi.controller.ts
│   │   │   │   │   │       └── dashboard.controller.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   └── ui
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   └── index.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.lib.json
│   │   ├── billing
│   │   │   ├── CHANGELOG.md
│   │   │   ├── OWNERS
│   │   │   ├── README.md
│   │   │   ├── application
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── billing-application.module.ts
│   │   │   │   │   ├── dto
│   │   │   │   │   │   └── create-invoice.dto.ts
│   │   │   │   │   ├── handlers
│   │   │   │   │   │   ├── billing-job.handler.ts
│   │   │   │   │   │   └── stripe-event.listener.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── mappers
│   │   │   │   │   │   └── create-invoice-input.mapper.ts
│   │   │   │   │   ├── ports
│   │   │   │   │   │   ├── outbound
│   │   │   │   │   │   │   └── invoice-integration-publisher.port.ts
│   │   │   │   │   │   ├── storage-read.port.ts
│   │   │   │   │   │   └── user-read.port.ts
│   │   │   │   │   ├── services
│   │   │   │   │   │   ├── invoice-stamping.orchestrator.ts
│   │   │   │   │   │   └── price-validation.policy.ts
│   │   │   │   │   └── use-cases
│   │   │   │   │       ├── commands
│   │   │   │   │       │   ├── add-payment-method.use-case.ts
│   │   │   │   │       │   ├── create-checkout-session.use-case.ts
│   │   │   │   │       │   ├── create-invoice.use-case.spec.ts
│   │   │   │   │       │   ├── create-invoice.use-case.ts
│   │   │   │   │       │   ├── create-subscription.use-case.ts
│   │   │   │   │       │   ├── handle-stripe-webhook.use-case.ts
│   │   │   │   │       │   ├── process-payment.use-case.ts
│   │   │   │   │       │   └── reconcile-billing.use-case.ts
│   │   │   │   │       └── queries
│   │   │   │   │           ├── get-invoices.use-case.ts
│   │   │   │   │           ├── get-payment-history.use-case.ts
│   │   │   │   │           ├── get-payment-method.use-case.ts
│   │   │   │   │           └── get-usage.use-case.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── contracts
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── jest.config.cts
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── api
│   │   │   │   │   │   └── v1
│   │   │   │   │   │       └── index.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── shared
│   │   │   │   │       ├── contracts.spec.ts
│   │   │   │   │       └── contracts.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── docs
│   │   │   │   └── migration-guide.md
│   │   │   ├── domain
│   │   │   │   ├── README.md
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── billing-domain.module.ts
│   │   │   │   │   ├── domain-services
│   │   │   │   │   │   ├── fiscal-stamping.service.spec.ts
│   │   │   │   │   │   ├── fiscal-stamping.service.ts
│   │   │   │   │   │   ├── tax-calculator.service.ts
│   │   │   │   │   │   └── tax-rule.engine.ts
│   │   │   │   │   ├── entities
│   │   │   │   │   │   ├── invoice-item.entity.ts
│   │   │   │   │   │   ├── invoice.entity.ts
│   │   │   │   │   │   ├── payment-method.entity.ts
│   │   │   │   │   │   ├── tax-line.entity.ts
│   │   │   │   │   │   └── tax-rule.entity.ts
│   │   │   │   │   ├── events
│   │   │   │   │   │   └── invoice-stamped.event.ts
│   │   │   │   │   ├── factories
│   │   │   │   │   │   ├── pac-strategy.factory.ts
│   │   │   │   │   │   └── tax-strategy.factory.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── repository-ports
│   │   │   │   │       ├── customer.repository.ts
│   │   │   │   │       ├── fiscal-stamping.port.ts
│   │   │   │   │       ├── invoice.repository.ts
│   │   │   │   │       ├── pac-provider.port.ts
│   │   │   │   │       ├── payment-method.repository.ts
│   │   │   │   │       ├── payment-provider.port.ts
│   │   │   │   │       ├── product.repository.ts
│   │   │   │   │       ├── tax-strategy.interface.ts
│   │   │   │   │       └── tenant-config.port.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── infrastructure
│   │   │   │   ├── README.md
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── billing-infrastructure.module.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── integrations
│   │   │   │   │   │   └── adapters
│   │   │   │   │   │       ├── br-tax.strategy.ts
│   │   │   │   │   │       ├── do-tax.strategy.ts
│   │   │   │   │   │       ├── finkok-pac.provider.ts
│   │   │   │   │   │       ├── fiscal-document-builder.factory.ts
│   │   │   │   │   │       ├── mx-tax.strategy.ts
│   │   │   │   │   │       ├── null-pac.provider.ts
│   │   │   │   │   │       ├── pac-strategy.factory.spec.ts
│   │   │   │   │   │       ├── pac-strategy.factory.ts
│   │   │   │   │   │       ├── stripe-payment-provider.adapter.spec.ts
│   │   │   │   │   │       ├── stripe-payment-provider.adapter.ts
│   │   │   │   │   │       ├── tax-strategy.factory.ts
│   │   │   │   │   │       └── us-tax.strategy.ts
│   │   │   │   │   ├── messaging
│   │   │   │   │   │   ├── consumers
│   │   │   │   │   │   │   └── product-events.controller.ts
│   │   │   │   │   │   └── producers
│   │   │   │   │   │       └── invoice-integration.publisher.ts
│   │   │   │   │   └── persistence
│   │   │   │   │       ├── entities
│   │   │   │   │       │   ├── billing-product.entity.ts
│   │   │   │   │       │   ├── invoice-item.record.ts
│   │   │   │   │       │   └── invoice.record.ts
│   │   │   │   │       ├── orm
│   │   │   │   │       │   └── mikro-orm.schemas.ts
│   │   │   │   │       └── repositories
│   │   │   │   │           ├── http-customer.repository.ts
│   │   │   │   │           ├── invoice.mapper.ts
│   │   │   │   │           ├── local-product.repository.ts
│   │   │   │   │           ├── mikro-orm-invoice.repository.ts
│   │   │   │   │           ├── mikro-orm-payment-method.repository.ts
│   │   │   │   │           └── mikro-orm-tenant-config.repository.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── presentation
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── billing-grpc.controller.ts
│   │   │   │   │   ├── billing-presentation.module.ts
│   │   │   │   │   ├── graphql
│   │   │   │   │   │   └── billing.resolver.ts
│   │   │   │   │   ├── http
│   │   │   │   │   │   ├── controllers
│   │   │   │   │   │   │   ├── billing.controller.ts
│   │   │   │   │   │   │   ├── payment-method.controller.ts
│   │   │   │   │   │   │   └── payment.controller.ts
│   │   │   │   │   │   ├── request-dto
│   │   │   │   │   │   │   └── create-invoice.input.ts
│   │   │   │   │   │   └── response-dto
│   │   │   │   │   │       ├── invoice.object.ts
│   │   │   │   │   │       └── invoice.presenter.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   ├── testing
│   │   │   │   └── e2e
│   │   │   │       ├── create-invoice.use-case.spec.ts
│   │   │   │       └── get-usage.use-case.spec.ts
│   │   │   └── ui
│   │   │       ├── package.json
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── index.ts
│   │   │       │   ├── lib.routes.ts
│   │   │       │   └── pages
│   │   │       │       ├── invoice-detail
│   │   │       │       │   └── invoice-detail.component.ts
│   │   │       │       └── invoice-list
│   │   │       │           └── invoice-list.component.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.lib.json
│   │   ├── catalog
│   │   │   ├── CHANGELOG.md
│   │   │   ├── OWNERS
│   │   │   ├── README.md
│   │   │   ├── application
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── jest.config.cts
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── application.spec.ts
│   │   │   │   │   ├── application.ts
│   │   │   │   │   ├── authorization
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   ├── catalog-application.module.ts
│   │   │   │   │   ├── dto
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   ├── handlers
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── mappers
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   ├── ports
│   │   │   │   │   │   ├── inbound
│   │   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   │   └── outbound
│   │   │   │   │   │       └── .gitkeep
│   │   │   │   │   ├── sagas
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   ├── services
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   ├── use-cases
│   │   │   │   │   │   ├── products
│   │   │   │   │   │   │   ├── create-product.use-case.ts
│   │   │   │   │   │   │   ├── delete-product.use-case.ts
│   │   │   │   │   │   │   ├── get-product-by-id.use-case.ts
│   │   │   │   │   │   │   ├── get-product-by-sku.use-case.ts
│   │   │   │   │   │   │   ├── get-products.use-case.ts
│   │   │   │   │   │   │   └── update-product.use-case.ts
│   │   │   │   │   │   └── sat-catalogs
│   │   │   │   │   │       └── get-sat-catalogs.use-case.ts
│   │   │   │   │   └── validators
│   │   │   │   │       └── .gitkeep
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   └── tsconfig.spec.json
│   │   │   ├── contracts
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── api
│   │   │   │   │   │   └── v1
│   │   │   │   │   │       ├── requests
│   │   │   │   │   │       │   └── .gitkeep
│   │   │   │   │   │       └── responses
│   │   │   │   │   │           ├── price-list.model.ts
│   │   │   │   │   │           └── product.model.ts
│   │   │   │   │   ├── compatibility
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   ├── events
│   │   │   │   │   │   └── v1
│   │   │   │   │   │       └── schemas
│   │   │   │   │   │           └── .gitkeep
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── messages
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   └── shared
│   │   │   │   │       └── .gitkeep
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   ├── docs
│   │   │   │   └── migration-guide.md
│   │   │   ├── domain
│   │   │   │   ├── OWNERS
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── jest.config.cts
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── aggregates
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   ├── domain-services
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   ├── domain.spec.ts
│   │   │   │   │   ├── domain.ts
│   │   │   │   │   ├── entities
│   │   │   │   │   │   ├── metering-record.entity.ts
│   │   │   │   │   │   ├── plugin-version.entity.ts
│   │   │   │   │   │   ├── plugin.entity.ts
│   │   │   │   │   │   ├── product.entity.ts
│   │   │   │   │   │   ├── sat-catalog.entity.ts
│   │   │   │   │   │   └── tenant-consent.entity.ts
│   │   │   │   │   ├── errors
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   ├── events
│   │   │   │   │   │   ├── product-created.event.ts
│   │   │   │   │   │   └── product-updated.event.ts
│   │   │   │   │   ├── factories
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── policies
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   ├── repository-ports
│   │   │   │   │   │   ├── product-read.repository.ts
│   │   │   │   │   │   ├── product-write.repository.ts
│   │   │   │   │   │   ├── product.repository.ts
│   │   │   │   │   │   └── sat-catalog.repository.ts
│   │   │   │   │   ├── specifications
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   └── value-objects
│   │   │   │   │       └── .gitkeep
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   └── tsconfig.spec.json
│   │   │   ├── infrastructure
│   │   │   │   ├── README.md
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── caching
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   ├── catalog-infrastructure.module.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── integrations
│   │   │   │   │   │   ├── adapters
│   │   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   │   ├── grpc
│   │   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   │   └── http
│   │   │   │   │   │       └── .gitkeep
│   │   │   │   │   ├── messaging
│   │   │   │   │   │   ├── consumers
│   │   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   │   ├── outbox
│   │   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   │   ├── producers
│   │   │   │   │   │   │   └── catalog-kafka.publisher.ts
│   │   │   │   │   │   └── serializers
│   │   │   │   │   │       └── .gitkeep
│   │   │   │   │   ├── observability
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   ├── persistence
│   │   │   │   │   │   ├── catalog-seeder.service.ts
│   │   │   │   │   │   ├── entities
│   │   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   │   ├── migrations
│   │   │   │   │   │   │   └── Migration20240521153000.ts
│   │   │   │   │   │   ├── orm
│   │   │   │   │   │   │   ├── mikro-orm.config.ts
│   │   │   │   │   │   │   └── mikro-orm.schemas.ts
│   │   │   │   │   │   ├── read-models
│   │   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   │   └── repositories
│   │   │   │   │   │       ├── mikro-orm-product.repository.ts
│   │   │   │   │   │       └── mikro-orm-sat-catalog.repository.ts
│   │   │   │   │   ├── security
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   ├── services
│   │   │   │   │   │   └── catalog-usage.providers.ts
│   │   │   │   │   └── tenancy
│   │   │   │   │       └── .gitkeep
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   ├── presentation
│   │   │   │   ├── README.md
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── catalog-presentation.module.ts
│   │   │   │   │   ├── filters
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   ├── graphql
│   │   │   │   │   │   ├── resolvers
│   │   │   │   │   │   │   └── catalog.resolver.ts
│   │   │   │   │   │   └── schemas
│   │   │   │   │   │       └── .gitkeep
│   │   │   │   │   ├── guards
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   ├── http
│   │   │   │   │   │   ├── controllers
│   │   │   │   │   │   │   └── catalog.controller.ts
│   │   │   │   │   │   ├── middlewares
│   │   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   │   ├── request-dto
│   │   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   │   ├── response-dto
│   │   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   │   └── routes
│   │   │   │   │   │       └── .gitkeep
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── interceptors
│   │   │   │   │   │   └── .gitkeep
│   │   │   │   │   └── models
│   │   │   │   │       ├── product.model.ts
│   │   │   │   │       └── sat-catalog.model.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   └── ui
│   │   │       ├── README.md
│   │   │       ├── eslint.config.mjs
│   │   │       ├── package.json
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── index.ts
│   │   │       │   ├── product-list
│   │   │       │   │   ├── product-list.component.html
│   │   │       │   │   ├── product-list.component.scss
│   │   │       │   │   └── product-list.component.ts
│   │   │       │   ├── test-setup.ts
│   │   │       │   └── ui
│   │   │       │       ├── ui.component.css
│   │   │       │       ├── ui.component.html
│   │   │       │       ├── ui.component.spec.ts
│   │   │       │       └── ui.component.ts
│   │   │       ├── tsconfig.json
│   │   │       ├── tsconfig.lib.json
│   │   │       ├── tsconfig.spec.json
│   │   │       ├── vite.config.mts
│   │   │       └── vitest.config.ts
│   │   ├── crm
│   │   │   ├── CHANGELOG.md
│   │   │   ├── OWNERS
│   │   │   ├── README.md
│   │   │   ├── application
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── crm-application.module.ts
│   │   │   │   │   ├── dto
│   │   │   │   │   │   └── create-sale.dto.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── use-cases
│   │   │   │   │       ├── commands
│   │   │   │   │       │   ├── approve-sale.use-case.ts
│   │   │   │   │       │   ├── cancel-sale.use-case.ts
│   │   │   │   │       │   ├── complete-sale.use-case.ts
│   │   │   │   │       │   ├── create-customer.use-case.ts
│   │   │   │   │       │   └── create-sale.use-case.ts
│   │   │   │   │       ├── queries
│   │   │   │   │       │   ├── get-customer-by-id.use-case.ts
│   │   │   │   │       │   ├── list-customers.use-case.ts
│   │   │   │   │       │   └── list-sales.use-case.ts
│   │   │   │   │       └── tests
│   │   │   │   │           └── sale-transitions.spec.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── contracts
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── api
│   │   │   │   │   │   └── v1
│   │   │   │   │   │       └── responses
│   │   │   │   │   │           └── customer.model.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── lib
│   │   │   │   │   │   └── enums
│   │   │   │   │   │       └── crm.enums.ts
│   │   │   │   │   └── shared
│   │   │   │   │       ├── customer-type.enum.ts
│   │   │   │   │       └── opportunity-stage.enum.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── docs
│   │   │   │   └── migration-guide.md
│   │   │   ├── domain
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── domain-services
│   │   │   │   │   │   ├── catalog.service.ts
│   │   │   │   │   │   └── inventory.service.ts
│   │   │   │   │   ├── entities
│   │   │   │   │   │   ├── customer.entity.spec.ts
│   │   │   │   │   │   ├── customer.entity.ts
│   │   │   │   │   │   ├── opportunity.entity.ts
│   │   │   │   │   │   └── sale.entity.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── repository-ports
│   │   │   │   │       ├── customer.repository.ts
│   │   │   │   │       └── sale.repository.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── infrastructure
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── integrations
│   │   │   │   │   │   └── http
│   │   │   │   │   │       ├── grpc-catalog.adapter.ts
│   │   │   │   │   │       └── http-inventory.adapter.ts
│   │   │   │   │   ├── persistence
│   │   │   │   │   │   ├── entities
│   │   │   │   │   │   │   ├── customer.schema.ts
│   │   │   │   │   │   │   ├── opportunity.schema.ts
│   │   │   │   │   │   │   └── sale.schema.ts
│   │   │   │   │   │   ├── orm
│   │   │   │   │   │   │   └── crm-infrastructure.module.ts
│   │   │   │   │   │   └── repositories
│   │   │   │   │   │       ├── mikro-orm-customer.repository.ts
│   │   │   │   │   │       └── mikro-orm-sale.repository.ts
│   │   │   │   │   └── services
│   │   │   │   │       └── crm-usage.providers.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── presentation
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── http
│   │   │   │   │   │   ├── controllers
│   │   │   │   │   │   │   └── crm.controller.ts
│   │   │   │   │   │   └── modules
│   │   │   │   │   │       └── crm-presentation.module.ts
│   │   │   │   │   └── index.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   └── ui
│   │   │       ├── package.json
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── index.ts
│   │   │       │   ├── lib.routes.ts
│   │   │       │   ├── pages
│   │   │       │   │   ├── customer-list
│   │   │       │   │   │   └── customer-list.component.ts
│   │   │       │   │   └── lead-pipeline
│   │   │       │   │       └── lead-pipeline.component.ts
│   │   │       │   └── routes
│   │   │       │       └── crm.routes.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.lib.json
│   │   ├── finops
│   │   │   ├── application
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       └── cost-reconciliation.service.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   ├── domain
│   │   │   │   ├── README.md
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── finops.module.ts
│   │   │   │   │       ├── finops.service.ts
│   │   │   │   │       ├── infrastructure
│   │   │   │   │       │   └── memory-usage.repository.ts
│   │   │   │   │       └── ports
│   │   │   │   │           └── usage.repository.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   └── infrastructure
│   │   │       ├── package.json
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   └── lib
│   │   │       │       ├── finops-infrastructure.module.ts
│   │   │       │       └── persistence
│   │   │       │           ├── sqlite-usage.repository.spec.ts
│   │   │       │           └── sqlite-usage.repository.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.lib.json
│   │   ├── fiscal
│   │   │   ├── application
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── fiscal-application.spec.ts
│   │   │   │   │       ├── fiscal-application.ts
│   │   │   │   │       ├── handlers
│   │   │   │   │       │   └── fiscal-job.handler.ts
│   │   │   │   │       └── use-cases
│   │   │   │   │           ├── create-declaration.use-case.ts
│   │   │   │   │           ├── create-tax-rule.use-case.ts
│   │   │   │   │           ├── get-fiscal-stats.use-case.ts
│   │   │   │   │           ├── get-tax-rate.use-case.ts
│   │   │   │   │           ├── get-tax-rules.use-case.ts
│   │   │   │   │           └── stamp-fiscal-document.use-case.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── contracts
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── fiscal-contracts.spec.ts
│   │   │   │   │       ├── fiscal-contracts.ts
│   │   │   │   │       └── models
│   │   │   │   │           └── tax.model.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── domain
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── contracts
│   │   │   │   │       │   └── fiscal-sales-snapshot.dto.ts
│   │   │   │   │       ├── entities
│   │   │   │   │       │   ├── fiscal-invoice.entity.ts
│   │   │   │   │       │   ├── fiscal-tax-rule.entity.ts
│   │   │   │   │       │   └── tax-declaration.entity.ts
│   │   │   │   │       ├── fiscal-domain.module.ts
│   │   │   │   │       ├── fiscal-domain.service.ts
│   │   │   │   │       ├── fiscal-domain.spec.ts
│   │   │   │   │       ├── fiscal-domain.ts
│   │   │   │   │       ├── ports
│   │   │   │   │       │   ├── fiscal-data-provider.port.ts
│   │   │   │   │       │   ├── fiscal-document-builder.port.ts
│   │   │   │   │       │   ├── fiscal-provider.port.ts
│   │   │   │   │       │   ├── hardware-token.port.ts
│   │   │   │   │       │   ├── tax-declaration.repository.ts
│   │   │   │   │       │   ├── tax-rule.repository.ts
│   │   │   │   │       │   └── tenant-config.port.ts
│   │   │   │   │       └── xslt
│   │   │   │   │           ├── cadenaoriginal_4_0.xslt
│   │   │   │   │           ├── nomina12.xslt
│   │   │   │   │           └── utilerias.xslt
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── infrastructure
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── adapters
│   │   │   │   │       │   ├── desktop-hardware-bridge.adapter.ts
│   │   │   │   │       │   ├── dgii-fiscal-provider.adapter.ts
│   │   │   │   │       │   ├── dian-fiscal-provider.adapter.hardening.spec.ts
│   │   │   │   │       │   ├── dian-fiscal-provider.adapter.spec.ts
│   │   │   │   │       │   ├── dian-fiscal-provider.adapter.ts
│   │   │   │   │       │   ├── fiscal-data.adapter.ts
│   │   │   │   │       │   ├── sat-fiscal-provider.adapter.ts
│   │   │   │   │       │   ├── sefaz-fiscal-provider.adapter.hardening.spec.ts
│   │   │   │   │       │   ├── sefaz-fiscal-provider.adapter.ts
│   │   │   │   │       │   ├── us-tax-partner-fiscal-provider.adapter.spec.ts
│   │   │   │   │       │   └── us-tax-partner-fiscal-provider.adapter.ts
│   │   │   │   │       ├── builders
│   │   │   │   │       │   ├── br-fiscal-document.builder.ts
│   │   │   │   │       │   ├── co-fiscal-document.builder.ts
│   │   │   │   │       │   ├── do-fiscal-document.builder.ts
│   │   │   │   │       │   ├── mx-fiscal-document.builder.ts
│   │   │   │   │       │   └── us-fiscal-document.builder.ts
│   │   │   │   │       ├── entities
│   │   │   │   │       │   ├── fiscal-tax-rule.record.ts
│   │   │   │   │       │   └── tax-declaration.record.ts
│   │   │   │   │       ├── factories
│   │   │   │   │       │   └── fiscal-provider.factory.ts
│   │   │   │   │       ├── fiscal-infrastructure.ts
│   │   │   │   │       ├── repositories
│   │   │   │   │       │   ├── mikro-orm-tax-declaration.repository.ts
│   │   │   │   │       │   ├── mikro-orm-tax-rule.repository.ts
│   │   │   │   │       │   └── mikro-orm-tenant-config.repository.ts
│   │   │   │   │       ├── schemas
│   │   │   │   │       │   ├── dian-ubl-2.1.xsd
│   │   │   │   │       │   └── nfe-4.00.xsd
│   │   │   │   │       └── test-utils
│   │   │   │   │           ├── mock-fiscal-provider.adapter.spec.ts
│   │   │   │   │           └── mock-fiscal-provider.adapter.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── presentation
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── controllers
│   │   │   │   │       │   └── fiscal.controller.ts
│   │   │   │   │       ├── fiscal-presentation.module.ts
│   │   │   │   │       ├── fiscal-presentation.spec.ts
│   │   │   │   │       └── fiscal-presentation.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   └── ui
│   │   │       ├── package.json
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── index.ts
│   │   │       │   ├── lib
│   │   │       │   │   ├── core
│   │   │       │   │   │   ├── api
│   │   │       │   │   │   │   └── taxes.service.ts
│   │   │       │   │   │   └── models
│   │   │       │   │   │       └── tax.model.ts
│   │   │       │   │   ├── lib.routes.ts
│   │   │       │   │   ├── pages
│   │   │       │   │   │   ├── dashboard
│   │   │       │   │   │   │   ├── dashboard.component.html
│   │   │       │   │   │   │   ├── dashboard.component.scss
│   │   │       │   │   │   │   └── dashboard.component.ts
│   │   │       │   │   │   └── list
│   │   │       │   │   │       ├── list.component.html
│   │   │       │   │   │       ├── list.component.scss
│   │   │       │   │   │       └── list.component.ts
│   │   │       │   │   └── services
│   │   │       │   │       ├── fiscal.service.ts
│   │   │       │   │       └── sat-catalog.service.ts
│   │   │       │   └── test-setup.ts
│   │   │       ├── tsconfig.json
│   │   │       ├── tsconfig.lib.json
│   │   │       ├── tsconfig.spec.json
│   │   │       └── vitest.config.ts
│   │   ├── fixed-assets
│   │   │   ├── application
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── fixed-assets-application.spec.ts
│   │   │   │   │       ├── fixed-assets-application.ts
│   │   │   │   │       └── use-cases
│   │   │   │   │           ├── create-fixed-asset.use-case.ts
│   │   │   │   │           └── get-fixed-assets.use-case.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── contracts
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── enums
│   │   │   │   │       │   ├── asset-status.enum.ts
│   │   │   │   │       │   ├── assets.enums.ts
│   │   │   │   │       │   └── depreciation-method.enum.ts
│   │   │   │   │       ├── fixed-assets-contracts.spec.ts
│   │   │   │   │       └── fixed-assets-contracts.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── domain
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── entities
│   │   │   │   │       │   ├── asset.entity.ts
│   │   │   │   │       │   ├── depreciation.entity.ts
│   │   │   │   │       │   └── fixed-asset.entity.ts
│   │   │   │   │       ├── enums
│   │   │   │   │       │   ├── asset-status.enum.ts
│   │   │   │   │       │   └── depreciation-method.enum.ts
│   │   │   │   │       ├── fixed-assets-domain.spec.ts
│   │   │   │   │       ├── fixed-assets-domain.ts
│   │   │   │   │       ├── ports
│   │   │   │   │       │   └── fixed-asset.repository.ts
│   │   │   │   │       └── services
│   │   │   │   │           └── depreciation-engine.service.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── infrastructure
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── fixed-assets-infrastructure.spec.ts
│   │   │   │   │       ├── fixed-assets-infrastructure.ts
│   │   │   │   │       ├── persistence
│   │   │   │   │       │   ├── entities
│   │   │   │   │       │   │   ├── asset.orm-entity.ts
│   │   │   │   │       │   │   ├── depreciation.orm-entity.ts
│   │   │   │   │       │   │   └── fixed-asset.orm-entity.ts
│   │   │   │   │       │   ├── fixed-assets.schemas.ts
│   │   │   │   │       │   └── mappers
│   │   │   │   │       │       └── fixed-assets-persistence.mapper.ts
│   │   │   │   │       └── repositories
│   │   │   │   │           └── mikro-orm-fixed-asset.repository.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── presentation
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── controllers
│   │   │   │   │       │   └── fixed-assets.controller.ts
│   │   │   │   │       ├── fixed-assets-presentation.spec.ts
│   │   │   │   │       └── fixed-assets-presentation.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   └── ui
│   │   │       ├── package.json
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── index.ts
│   │   │       │   └── lib
│   │   │       │       └── lib.routes.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.lib.json
│   │   ├── identity
│   │   │   ├── application
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── iam
│   │   │   │   │       │   ├── block-user.use-case.ts
│   │   │   │   │       │   ├── change-password.use-case.spec.ts
│   │   │   │   │       │   ├── change-password.use-case.ts
│   │   │   │   │       │   ├── check-security-context.use-case.ts
│   │   │   │   │       │   ├── confirm-mfa.use-case.ts
│   │   │   │   │       │   ├── delete-user.use-case.ts
│   │   │   │   │       │   ├── disable-2fa.use-case.spec.ts
│   │   │   │   │       │   ├── disable-2fa.use-case.ts
│   │   │   │   │       │   ├── force-logout.use-case.ts
│   │   │   │   │       │   ├── forgot-password.use-case.ts
│   │   │   │   │       │   ├── generate-backup-codes.use-case.spec.ts
│   │   │   │   │       │   ├── generate-backup-codes.use-case.ts
│   │   │   │   │       │   ├── generate-passkey-login-options.use-case.ts
│   │   │   │   │       │   ├── generate-passkey-registration-options.use-case.ts
│   │   │   │   │       │   ├── get-audit-logs.use-case.ts
│   │   │   │   │       │   ├── get-job-titles.use-case.ts
│   │   │   │   │       │   ├── get-sessions.use-case.spec.ts
│   │   │   │   │       │   ├── get-sessions.use-case.ts
│   │   │   │   │       │   ├── get-social-register-info.use-case.ts
│   │   │   │   │       │   ├── handle-social-login.use-case.ts
│   │   │   │   │       │   ├── impersonate-user.use-case.spec.ts
│   │   │   │   │       │   ├── impersonate-user.use-case.ts
│   │   │   │   │       │   ├── initiate-signup.use-case.ts
│   │   │   │   │       │   ├── invite-user.use-case.spec.ts
│   │   │   │   │       │   ├── invite-user.use-case.ts
│   │   │   │   │       │   ├── list-tenants.use-case.ts
│   │   │   │   │       │   ├── list-users.use-case.ts
│   │   │   │   │       │   ├── login-user.use-case.spec.ts
│   │   │   │   │       │   ├── login-user.use-case.ts
│   │   │   │   │       │   ├── logout-user.use-case.ts
│   │   │   │   │       │   ├── refresh-token.use-case.spec.ts
│   │   │   │   │       │   ├── refresh-token.use-case.ts
│   │   │   │   │       │   ├── reset-password.use-case.ts
│   │   │   │   │       │   ├── revoke-session.use-case.spec.ts
│   │   │   │   │       │   ├── revoke-session.use-case.ts
│   │   │   │   │       │   ├── send-2fa-email-verification.use-case.spec.ts
│   │   │   │   │       │   ├── send-2fa-email-verification.use-case.ts
│   │   │   │   │       │   ├── set-password.use-case.ts
│   │   │   │   │       │   ├── setup-mfa.use-case.ts
│   │   │   │   │       │   ├── update-user.use-case.ts
│   │   │   │   │       │   ├── verify-2fa-email-verification.use-case.spec.ts
│   │   │   │   │       │   ├── verify-2fa-email-verification.use-case.ts
│   │   │   │   │       │   ├── verify-mfa.use-case.ts
│   │   │   │   │       │   ├── verify-passkey-login.use-case.ts
│   │   │   │   │       │   ├── verify-passkey-registration.use-case.ts
│   │   │   │   │       │   └── verify-signup.use-case.ts
│   │   │   │   │       ├── listeners
│   │   │   │   │       │   └── user-invited.listener.ts
│   │   │   │   │       ├── onboarding
│   │   │   │   │       │   ├── complete-onboarding.use-case.ts
│   │   │   │   │       │   └── get-onboarding-status.use-case.ts
│   │   │   │   │       ├── ports
│   │   │   │   │       │   └── storage.port.ts
│   │   │   │   │       ├── services
│   │   │   │   │       │   ├── countries.json
│   │   │   │   │       │   ├── localization.service.spec.ts
│   │   │   │   │       │   ├── localization.service.ts
│   │   │   │   │       │   ├── tax-providers
│   │   │   │   │       │   │   ├── abstract-robust-tax-provider.ts
│   │   │   │   │       │   │   ├── dominican-republic-tax-provider.ts
│   │   │   │   │       │   │   ├── generic-tax-provider.ts
│   │   │   │   │       │   │   ├── mexico-tax-provider.ts
│   │   │   │   │       │   │   ├── tax-provider-factory.ts
│   │   │   │   │       │   │   └── us-tax-provider.ts
│   │   │   │   │       │   └── token-generation.service.ts
│   │   │   │   │       └── user-profile
│   │   │   │   │           ├── get-user-profile.use-case.ts
│   │   │   │   │           ├── update-user-profile.use-case.ts
│   │   │   │   │           └── upload-avatar.use-case.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── contracts
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── dto
│   │   │   │   │       │   ├── change-password.dto.ts
│   │   │   │   │       │   ├── complete-onboarding.dto.ts
│   │   │   │   │       │   ├── forgot-password.dto.ts
│   │   │   │   │       │   ├── initiate-signup.dto.ts
│   │   │   │   │       │   ├── invite-user.dto.ts
│   │   │   │   │       │   ├── login-response.dto.ts
│   │   │   │   │       │   ├── login-user.dto.ts
│   │   │   │   │       │   ├── paginated-users-response.dto.ts
│   │   │   │   │       │   ├── refresh-token.dto.ts
│   │   │   │   │       │   ├── register-user.dto.ts
│   │   │   │   │       │   ├── reset-password.dto.ts
│   │   │   │   │       │   ├── set-password.dto.ts
│   │   │   │   │       │   ├── unified-login-response.dto.ts
│   │   │   │   │       │   ├── update-user.dto.ts
│   │   │   │   │       │   ├── user-response.dto.ts
│   │   │   │   │       │   ├── verify-mfa.dto.ts
│   │   │   │   │       │   └── verify-signup.dto.ts
│   │   │   │   │       └── dtos
│   │   │   │   │           ├── audit-log.dto.ts
│   │   │   │   │           └── localization.dto.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── domain
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── events
│   │   │   │   │       │   ├── user-invited.event.ts
│   │   │   │   │       │   └── user-registered.event.ts
│   │   │   │   │       ├── iam
│   │   │   │   │       │   ├── session.entity.ts
│   │   │   │   │       │   ├── user-authenticator.entity.ts
│   │   │   │   │       │   └── user.entity.ts
│   │   │   │   │       ├── onboarding
│   │   │   │   │       │   └── company.entity.ts
│   │   │   │   │       ├── policies
│   │   │   │   │       │   └── tax-id-validator.ts
│   │   │   │   │       ├── ports
│   │   │   │   │       │   ├── audit-log.repository.ts
│   │   │   │   │       │   ├── auth.service.ts
│   │   │   │   │       │   ├── cache.port.ts
│   │   │   │   │       │   ├── company.repository.ts
│   │   │   │   │       │   ├── geo-ip.port.ts
│   │   │   │   │       │   ├── job-title.repository.ts
│   │   │   │   │       │   ├── localization.port.ts
│   │   │   │   │       │   ├── notification.service.ts
│   │   │   │   │       │   ├── recaptcha.port.ts
│   │   │   │   │       │   ├── risk-engine.service.ts
│   │   │   │   │       │   ├── session.repository.ts
│   │   │   │   │       │   ├── tax-provider.port.ts
│   │   │   │   │       │   ├── tenant.repository.ts
│   │   │   │   │       │   ├── unit-of-work.port.ts
│   │   │   │   │       │   └── user.repository.ts
│   │   │   │   │       ├── services
│   │   │   │   │       │   └── risk-evaluator.service.ts
│   │   │   │   │       └── user-profile
│   │   │   │   │           ├── audit-log.entity.ts
│   │   │   │   │           └── job-title.entity.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── infrastructure
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── lib
│   │   │   │   │   │   ├── adapters
│   │   │   │   │   │   │   ├── geo-ip-lite.adapter.ts
│   │   │   │   │   │   │   ├── mikro-orm-tenant.repository.ts
│   │   │   │   │   │   │   ├── mikro-orm-unit-of-work.adapter.ts
│   │   │   │   │   │   │   ├── redis-cache.adapter.ts
│   │   │   │   │   │   │   └── storage.adapter.ts
│   │   │   │   │   │   ├── identity-infrastructure.module.ts
│   │   │   │   │   │   ├── mappers
│   │   │   │   │   │   │   └── user.mapper.ts
│   │   │   │   │   │   ├── persistence
│   │   │   │   │   │   │   ├── entities
│   │   │   │   │   │   │   │   ├── audit-log.orm-entity.ts
│   │   │   │   │   │   │   │   ├── company.orm-entity.ts
│   │   │   │   │   │   │   │   ├── job-title.orm-entity.ts
│   │   │   │   │   │   │   │   ├── session.orm-entity.ts
│   │   │   │   │   │   │   │   ├── user-authenticator.orm-entity.ts
│   │   │   │   │   │   │   │   └── user.orm-entity.ts
│   │   │   │   │   │   │   ├── identity.schemas.ts
│   │   │   │   │   │   │   ├── mikro-orm-audit-log.repository.ts
│   │   │   │   │   │   │   ├── mikro-orm-company.repository.ts
│   │   │   │   │   │   │   ├── mikro-orm-job-title.repository.ts
│   │   │   │   │   │   │   ├── mikro-orm-session.repository.ts
│   │   │   │   │   │   │   └── mikro-orm-user.repository.ts
│   │   │   │   │   │   ├── services
│   │   │   │   │   │   │   ├── argon2-auth.service.ts
│   │   │   │   │   │   │   ├── configuration-validator.service.ts
│   │   │   │   │   │   │   ├── identity-session-validator.service.ts
│   │   │   │   │   │   │   ├── identity-usage.providers.ts
│   │   │   │   │   │   │   ├── keycloak-auth.service.ts
│   │   │   │   │   │   │   ├── mail-queue.producer.ts
│   │   │   │   │   │   │   ├── mail.processor.ts
│   │   │   │   │   │   │   ├── nodemailer-notification.service.ts
│   │   │   │   │   │   │   ├── recaptcha.service.ts
│   │   │   │   │   │   │   ├── risk-engine.service.ts
│   │   │   │   │   │   │   ├── session.serializer.ts
│   │   │   │   │   │   │   ├── webauthn.service.spec.ts
│   │   │   │   │   │   │   └── webauthn.service.ts
│   │   │   │   │   │   └── strategies
│   │   │   │   │   │       ├── google.strategy.ts
│   │   │   │   │   │       ├── microsoft.strategy.ts
│   │   │   │   │   │       └── okta.strategy.ts
│   │   │   │   │   └── passport-openidconnect.d.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── presentation
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── graphql
│   │   │   │   │       │   ├── dto
│   │   │   │   │       │   │   ├── login.input.ts
│   │   │   │   │       │   │   ├── login.response.ts
│   │   │   │   │       │   │   ├── signup.input.ts
│   │   │   │   │       │   │   └── signup.response.ts
│   │   │   │   │       │   ├── identity.resolver.spec.ts
│   │   │   │   │       │   └── identity.resolver.ts
│   │   │   │   │       ├── guards
│   │   │   │   │       │   └── session.guard.ts
│   │   │   │   │       ├── iam
│   │   │   │   │       │   ├── auth-mfa.controller.ts
│   │   │   │   │       │   ├── auth-passkey.controller.ts
│   │   │   │   │       │   ├── auth-recovery.controller.ts
│   │   │   │   │       │   ├── auth-security.controller.ts
│   │   │   │   │       │   ├── auth-session.controller.spec.ts
│   │   │   │   │       │   ├── auth-session.controller.ts
│   │   │   │   │       │   ├── auth-social.controller.ts
│   │   │   │   │       │   ├── common.controller.ts
│   │   │   │   │       │   ├── tenant.controller.ts
│   │   │   │   │       │   ├── user-admin.controller.spec.ts
│   │   │   │   │       │   ├── user-admin.controller.ts
│   │   │   │   │       │   ├── user-security.controller.spec.ts
│   │   │   │   │       │   └── user-security.controller.ts
│   │   │   │   │       ├── identity-presentation.module.ts
│   │   │   │   │       ├── mappers
│   │   │   │   │       │   ├── audit-log.mapper.ts
│   │   │   │   │       │   └── user.mapper.ts
│   │   │   │   │       ├── onboarding
│   │   │   │   │       │   └── auth-onboarding.controller.ts
│   │   │   │   │       ├── services
│   │   │   │   │       │   └── request-context.service.ts
│   │   │   │   │       └── user-profile
│   │   │   │   │           ├── localization.controller.spec.ts
│   │   │   │   │           ├── localization.controller.ts
│   │   │   │   │           ├── user-profile.controller.spec.ts
│   │   │   │   │           └── user-profile.controller.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   └── ui
│   │   │       ├── README.md
│   │   │       ├── eslint.config.mjs
│   │   │       ├── package.json
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── index.ts
│   │   │       │   ├── lib
│   │   │       │   │   ├── components
│   │   │       │   │   │   └── country-selector
│   │   │       │   │   │       ├── country-selector.component.html
│   │   │       │   │   │       ├── country-selector.component.scss
│   │   │       │   │   │       └── country-selector.component.ts
│   │   │       │   │   ├── core
│   │   │       │   │   │   └── utils
│   │   │       │   │   │       └── auth-translate-loader.ts
│   │   │       │   │   ├── identity-ui
│   │   │       │   │   │   ├── identity-ui.css
│   │   │       │   │   │   ├── identity-ui.html
│   │   │       │   │   │   ├── identity-ui.spec.ts
│   │   │       │   │   │   └── identity-ui.ts
│   │   │       │   │   ├── lib.routes.ts
│   │   │       │   │   ├── pages
│   │   │       │   │   │   ├── auth
│   │   │       │   │   │   │   ├── auth.routes.ts
│   │   │       │   │   │   │   ├── components
│   │   │       │   │   │   │   │   ├── auth-button
│   │   │       │   │   │   │   │   │   ├── auth-button.component.html
│   │   │       │   │   │   │   │   │   ├── auth-button.component.scss
│   │   │       │   │   │   │   │   │   └── auth-button.component.ts
│   │   │       │   │   │   │   │   ├── auth-footer
│   │   │       │   │   │   │   │   │   ├── auth-footer.component.html
│   │   │       │   │   │   │   │   │   ├── auth-footer.component.scss
│   │   │       │   │   │   │   │   │   └── auth-footer.component.ts
│   │   │       │   │   │   │   │   ├── auth-input
│   │   │       │   │   │   │   │   │   ├── auth-input.component.html
│   │   │       │   │   │   │   │   │   ├── auth-input.component.scss
│   │   │       │   │   │   │   │   │   └── auth-input.component.ts
│   │   │       │   │   │   │   │   ├── auth-layout
│   │   │       │   │   │   │   │   │   ├── auth-layout.component.html
│   │   │       │   │   │   │   │   │   ├── auth-layout.component.scss
│   │   │       │   │   │   │   │   │   └── auth-layout.component.ts
│   │   │       │   │   │   │   │   ├── password-validator
│   │   │       │   │   │   │   │   │   └── password-validator.component.ts
│   │   │       │   │   │   │   │   └── social-auth-buttons
│   │   │       │   │   │   │   │       ├── social-auth-buttons.component.html
│   │   │       │   │   │   │   │       ├── social-auth-buttons.component.scss
│   │   │       │   │   │   │   │       └── social-auth-buttons.component.ts
│   │   │       │   │   │   │   ├── forgot-password
│   │   │       │   │   │   │   │   └── forgot-password
│   │   │       │   │   │   │   │       ├── forgot-password.page.html
│   │   │       │   │   │   │   │       ├── forgot-password.page.scss
│   │   │       │   │   │   │   │       ├── forgot-password.page.spec.ts
│   │   │       │   │   │   │   │       └── forgot-password.page.ts
│   │   │       │   │   │   │   ├── login
│   │   │       │   │   │   │   │   ├── login.page.html
│   │   │       │   │   │   │   │   ├── login.page.scss
│   │   │       │   │   │   │   │   ├── login.page.spec.ts
│   │   │       │   │   │   │   │   └── login.page.ts
│   │   │       │   │   │   │   ├── plan-selection
│   │   │       │   │   │   │   │   ├── plan-selection.component.html
│   │   │       │   │   │   │   │   ├── plan-selection.component.scss
│   │   │       │   │   │   │   │   └── plan-selection.component.ts
│   │   │       │   │   │   │   ├── register
│   │   │       │   │   │   │   │   ├── register.page.html
│   │   │       │   │   │   │   │   ├── register.page.scss
│   │   │       │   │   │   │   │   ├── register.page.spec.ts
│   │   │       │   │   │   │   │   ├── register.page.ts
│   │   │       │   │   │   │   │   └── steps
│   │   │       │   │   │   │   │       ├── step-access
│   │   │       │   │   │   │   │       │   ├── step-access.html
│   │   │       │   │   │   │   │       │   ├── step-access.scss
│   │   │       │   │   │   │   │       │   └── step-access.ts
│   │   │       │   │   │   │   │       ├── step-account
│   │   │       │   │   │   │   │       │   ├── step-account.html
│   │   │       │   │   │   │   │       │   ├── step-account.scss
│   │   │       │   │   │   │   │       │   └── step-account.ts
│   │   │       │   │   │   │   │       ├── step-account-info
│   │   │       │   │   │   │   │       │   ├── step-account-info.html
│   │   │       │   │   │   │   │       │   ├── step-account-info.scss
│   │   │       │   │   │   │   │       │   └── step-account-info.ts
│   │   │       │   │   │   │   │       ├── step-business
│   │   │       │   │   │   │   │       │   ├── step-business.component.ts
│   │   │       │   │   │   │   │       │   ├── step-business.html
│   │   │       │   │   │   │   │       │   ├── step-business.scss
│   │   │       │   │   │   │   │       │   └── step-business.ts
│   │   │       │   │   │   │   │       ├── step-configuration
│   │   │       │   │   │   │   │       │   ├── step-configuration.html
│   │   │       │   │   │   │   │       │   ├── step-configuration.scss
│   │   │       │   │   │   │   │       │   ├── step-configuration.spec.ts
│   │   │       │   │   │   │   │       │   └── step-configuration.ts
│   │   │       │   │   │   │   │       └── step-plan
│   │   │       │   │   │   │   │           ├── step-plan.html
│   │   │       │   │   │   │   │           ├── step-plan.scss
│   │   │       │   │   │   │   │           └── step-plan.ts
│   │   │       │   │   │   │   ├── reset-password
│   │   │       │   │   │   │   │   └── reset-password.page
│   │   │       │   │   │   │   │       ├── reset-password.page.html
│   │   │       │   │   │   │   │       ├── reset-password.page.scss
│   │   │       │   │   │   │   │       ├── reset-password.page.spec.ts
│   │   │       │   │   │   │   │       └── reset-password.page.ts
│   │   │       │   │   │   │   └── set-password
│   │   │       │   │   │   │       ├── set-password.page.html
│   │   │       │   │   │   │       ├── set-password.page.scss
│   │   │       │   │   │   │       ├── set-password.page.spec.ts
│   │   │       │   │   │   │       └── set-password.page.ts
│   │   │       │   │   │   ├── components
│   │   │       │   │   │   │   ├── phone-verification-modal
│   │   │       │   │   │   │   │   └── phone-verification-modal.component.ts
│   │   │       │   │   │   │   └── security-settings
│   │   │       │   │   │   │       ├── security-settings.component.html
│   │   │       │   │   │   │       ├── security-settings.component.scss
│   │   │       │   │   │   │       └── security-settings.component.ts
│   │   │       │   │   │   ├── profile
│   │   │       │   │   │   │   ├── components
│   │   │       │   │   │   │   │   ├── session-management
│   │   │       │   │   │   │   │   │   ├── session-management.component.html
│   │   │       │   │   │   │   │   │   ├── session-management.component.scss
│   │   │       │   │   │   │   │   │   └── session-management.component.ts
│   │   │       │   │   │   │   │   └── two-factor-auth
│   │   │       │   │   │   │   │       ├── two-factor-auth.component.html
│   │   │       │   │   │   │   │       ├── two-factor-auth.component.scss
│   │   │       │   │   │   │   │       └── two-factor-auth.component.ts
│   │   │       │   │   │   │   ├── my-profile.page.html
│   │   │       │   │   │   │   ├── my-profile.page.scss
│   │   │       │   │   │   │   ├── my-profile.page.spec.ts
│   │   │       │   │   │   │   └── my-profile.page.ts
│   │   │       │   │   │   ├── roles
│   │   │       │   │   │   │   ├── roles.page.html
│   │   │       │   │   │   │   ├── roles.page.scss
│   │   │       │   │   │   │   └── roles.page.ts
│   │   │       │   │   │   └── user-management
│   │   │       │   │   │       ├── user-management.page.html
│   │   │       │   │   │       ├── user-management.page.scss
│   │   │       │   │   │       ├── user-management.page.spec.ts
│   │   │       │   │   │       └── user-management.page.ts
│   │   │       │   │   ├── profile.service.ts
│   │   │       │   │   └── services
│   │   │       │   │       └── intent-detection.service.ts
│   │   │       │   └── test-setup.ts
│   │   │       ├── tsconfig.json
│   │   │       ├── tsconfig.lib.json
│   │   │       ├── tsconfig.spec.json
│   │   │       ├── vite.config.mts
│   │   │       └── vitest.config.ts
│   │   ├── identity-audit-ledger
│   │   │   ├── application
│   │   │   │   ├── README.md
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── domain-identity-audit-ledger-application.module.ts
│   │   │   │   │       └── record-event.use-case.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   ├── contracts
│   │   │   │   ├── README.md
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       └── domain-identity-audit-ledger-contracts.module.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   ├── domain
│   │   │   │   ├── README.md
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       └── domain-identity-audit-ledger-domain.module.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   ├── infrastructure
│   │   │   │   ├── README.md
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       └── domain-identity-audit-ledger-infrastructure.module.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   └── presentation
│   │   │       ├── README.md
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── index.ts
│   │   │       │   └── lib
│   │   │       │       └── domain-identity-audit-ledger-presentation.module.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.lib.json
│   │   ├── identity-profile
│   │   │   ├── application
│   │   │   │   ├── README.md
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── domain-identity-profile-application.module.ts
│   │   │   │   │       ├── get-user-profile.use-case.ts
│   │   │   │   │       └── update-user-profile.use-case.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   ├── contracts
│   │   │   │   ├── README.md
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       └── domain-identity-profile-contracts.module.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   ├── domain
│   │   │   │   ├── README.md
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── domain-identity-profile-domain.module.ts
│   │   │   │   │       └── user-identity.entity.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   ├── infrastructure
│   │   │   │   ├── README.md
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       └── domain-identity-profile-infrastructure.module.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   └── presentation
│   │   │       ├── README.md
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── index.ts
│   │   │       │   └── lib
│   │   │       │       ├── domain-identity-profile-presentation.module.ts
│   │   │       │       └── identity-profile.grpc.controller.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.lib.json
│   │   ├── inventory
│   │   │   ├── application
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── jest.config.cts
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── inventory-application.module.ts
│   │   │   │   │       └── use-cases
│   │   │   │   │           ├── check-stock.use-case.ts
│   │   │   │   │           ├── create-warehouse.use-case.spec.ts
│   │   │   │   │           ├── create-warehouse.use-case.ts
│   │   │   │   │           ├── delete-warehouse.use-case.ts
│   │   │   │   │           ├── generate-warehouse-code.use-case.spec.ts
│   │   │   │   │           ├── generate-warehouse-code.use-case.ts
│   │   │   │   │           ├── get-warehouse.use-case.ts
│   │   │   │   │           ├── get-warehouses.use-case.ts
│   │   │   │   │           ├── register-inventory-movement-batch.use-case.ts
│   │   │   │   │           ├── register-movement.use-case.ts
│   │   │   │   │           ├── reserve-batch-stock.use-case.ts
│   │   │   │   │           ├── reserve-stock.use-case.ts
│   │   │   │   │           └── update-warehouse.use-case.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   └── tsconfig.spec.json
│   │   │   ├── contracts
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── jest.config.cts
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       └── inventory-contracts.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   └── tsconfig.spec.json
│   │   │   ├── domain
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── jest.config.cts
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── entities
│   │   │   │   │       │   ├── inventory-movement.entity.ts
│   │   │   │   │       │   ├── location.entity.ts
│   │   │   │   │       │   ├── stock.entity.spec.ts
│   │   │   │   │       │   ├── stock.entity.ts
│   │   │   │   │       │   └── warehouse.entity.ts
│   │   │   │   │       ├── errors
│   │   │   │   │       │   ├── domain-validation.error.ts
│   │   │   │   │       │   ├── stock-data-inconsistency.error.ts
│   │   │   │   │       │   ├── stock-not-found.error.ts
│   │   │   │   │       │   └── warehouse-not-found.error.ts
│   │   │   │   │       ├── exceptions
│   │   │   │   │       │   ├── insufficient-stock.exception.ts
│   │   │   │   │       │   └── warehouse-not-found.exception.ts
│   │   │   │   │       └── ports
│   │   │   │   │           ├── inventory.repository.ts
│   │   │   │   │           ├── product.gateway.ts
│   │   │   │   │           └── warehouse.repository.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   └── tsconfig.spec.json
│   │   │   ├── infrastructure
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── jest.config.cts
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── adapters
│   │   │   │   │       │   ├── catalog-product-read.gateway.spec.ts
│   │   │   │   │       │   └── catalog-product-read.gateway.ts
│   │   │   │   │       ├── inventory-infrastructure.module.ts
│   │   │   │   │       ├── persistence
│   │   │   │   │       │   ├── entities
│   │   │   │   │       │   │   ├── inventory-movement.orm-entity.ts
│   │   │   │   │       │   │   ├── location.orm-entity.ts
│   │   │   │   │       │   │   ├── stock.orm-entity.ts
│   │   │   │   │       │   │   └── warehouse.orm-entity.ts
│   │   │   │   │       │   ├── inventory.schemas.ts
│   │   │   │   │       │   └── mappers
│   │   │   │   │       │       └── inventory.mapper.ts
│   │   │   │   │       └── repositories
│   │   │   │   │           ├── mikro-orm-inventory.repository.ts
│   │   │   │   │           └── mikro-orm-warehouse.repository.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── presentation
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── jest.config.cts
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── controllers
│   │   │   │   │       │   ├── dto
│   │   │   │   │       │   │   ├── reserve-batch-stock.dto.ts
│   │   │   │   │       │   │   ├── reserve-stock.dto.ts
│   │   │   │   │       │   │   └── update-warehouse-body.dto.ts
│   │   │   │   │       │   ├── inventory-grpc.controller.ts
│   │   │   │   │       │   ├── movements.controller.ts
│   │   │   │   │       │   ├── reservations.controller.ts
│   │   │   │   │       │   ├── stock.controller.ts
│   │   │   │   │       │   └── warehouses.controller.ts
│   │   │   │   │       ├── dto
│   │   │   │   │       │   └── register-movement.dto.ts
│   │   │   │   │       ├── filters
│   │   │   │   │       │   └── inventory-application-exception.filter.ts
│   │   │   │   │       ├── graphql
│   │   │   │   │       │   ├── dto
│   │   │   │   │       │   │   ├── create-warehouse.input.ts
│   │   │   │   │       │   │   ├── register-movement-item.input.ts
│   │   │   │   │       │   │   ├── register-movement.input.ts
│   │   │   │   │       │   │   ├── update-warehouse.input.ts
│   │   │   │   │       │   │   └── warehouse.object.ts
│   │   │   │   │       │   └── inventory.resolver.ts
│   │   │   │   │       ├── inventory-presentation.module.ts
│   │   │   │   │       ├── loaders
│   │   │   │   │       │   └── warehouse.loader.ts
│   │   │   │   │       └── security
│   │   │   │   │           ├── tenant-context.resolver.spec.ts
│   │   │   │   │           └── tenant-context.resolver.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   └── tsconfig.spec.json
│   │   │   └── ui-wms
│   │   │       ├── README.md
│   │   │       ├── eslint.config.mjs
│   │   │       ├── package.json
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── index.ts
│   │   │       │   ├── lib
│   │   │       │   │   ├── inventory-dashboard.service.ts
│   │   │       │   │   ├── scan
│   │   │       │   │   │   ├── scan.component.html
│   │   │       │   │   │   ├── scan.component.scss
│   │   │       │   │   │   └── scan.component.ts
│   │   │       │   │   └── ui-wms
│   │   │       │   │       ├── ui-wms.css
│   │   │       │   │       ├── ui-wms.html
│   │   │       │   │       ├── ui-wms.spec.ts
│   │   │       │   │       └── ui-wms.ts
│   │   │       │   └── test-setup.ts
│   │   │       ├── tsconfig.json
│   │   │       ├── tsconfig.lib.json
│   │   │       ├── tsconfig.spec.json
│   │   │       ├── vite.config.mts
│   │   │       └── vitest.config.ts
│   │   ├── manufacturing
│   │   │   ├── application
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── manufacturing-application.spec.ts
│   │   │   │   │       ├── manufacturing-application.ts
│   │   │   │   │       └── use-cases
│   │   │   │   │           ├── create-production-order.use-case.spec.ts
│   │   │   │   │           ├── create-production-order.use-case.ts
│   │   │   │   │           └── get-production-orders.use-case.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── contracts
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── enums
│   │   │   │   │       │   ├── manufacturing.enums.ts
│   │   │   │   │       │   └── production-order-status.enum.ts
│   │   │   │   │       ├── manufacturing-contracts.spec.ts
│   │   │   │   │       └── manufacturing-contracts.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── domain
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── entities
│   │   │   │   │       │   ├── bill-of-materials.entity.ts
│   │   │   │   │       │   ├── mrp.entities.ts
│   │   │   │   │       │   └── production-order.entity.ts
│   │   │   │   │       ├── manufacturing-domain.spec.ts
│   │   │   │   │       ├── manufacturing-domain.ts
│   │   │   │   │       └── ports
│   │   │   │   │           ├── bill-of-materials.repository.ts
│   │   │   │   │           ├── inventory.service.ts
│   │   │   │   │           └── production-order.repository.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── infrastructure
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── adapters
│   │   │   │   │       │   └── grpc-inventory.adapter.ts
│   │   │   │   │       ├── manufacturing-infrastructure.spec.ts
│   │   │   │   │       ├── manufacturing-infrastructure.ts
│   │   │   │   │       ├── migrations
│   │   │   │   │       │   └── Migration20240521153000.ts
│   │   │   │   │       ├── persistence
│   │   │   │   │       │   ├── entities
│   │   │   │   │       │   │   ├── bill-of-materials.orm-entity.ts
│   │   │   │   │       │   │   └── production-order.orm-entity.ts
│   │   │   │   │       │   ├── manufacturing.schemas.ts
│   │   │   │   │       │   └── mikro-orm.config.ts
│   │   │   │   │       └── repositories
│   │   │   │   │           ├── mikro-orm-bill-of-materials.repository.ts
│   │   │   │   │           └── mikro-orm-production-order.repository.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── presentation
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── controllers
│   │   │   │   │       │   └── manufacturing.controller.ts
│   │   │   │   │       ├── dto
│   │   │   │   │       │   └── create-production-order.dto.ts
│   │   │   │   │       ├── manufacturing-presentation.module.ts
│   │   │   │   │       ├── manufacturing-presentation.spec.ts
│   │   │   │   │       └── manufacturing-presentation.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   └── ui-shopfloor
│   │   │       ├── README.md
│   │   │       ├── eslint.config.mjs
│   │   │       ├── package.json
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── index.ts
│   │   │       │   ├── lib
│   │   │       │   │   ├── kiosk
│   │   │       │   │   │   ├── kiosk.component.html
│   │   │       │   │   │   ├── kiosk.component.scss
│   │   │       │   │   │   └── kiosk.component.ts
│   │   │       │   │   └── ui-shopfloor
│   │   │       │   │       ├── ui-shopfloor.css
│   │   │       │   │       ├── ui-shopfloor.html
│   │   │       │   │       ├── ui-shopfloor.spec.ts
│   │   │       │   │       └── ui-shopfloor.ts
│   │   │       │   └── test-setup.ts
│   │   │       ├── tsconfig.json
│   │   │       ├── tsconfig.lib.json
│   │   │       ├── tsconfig.spec.json
│   │   │       ├── vite.config.mts
│   │   │       └── vitest.config.ts
│   │   ├── notification
│   │   │   ├── application
│   │   │   │   ├── project.json
│   │   │   │   └── src
│   │   │   │       ├── index.ts
│   │   │   │       └── lib
│   │   │   │           ├── compliance.service.spec.ts
│   │   │   │           ├── compliance.service.ts
│   │   │   │           ├── notification-application.module.ts
│   │   │   │           ├── notification-orchestrator.ts
│   │   │   │           ├── notification.service.ts
│   │   │   │           └── template.service.ts
│   │   │   ├── domain
│   │   │   │   ├── project.json
│   │   │   │   └── src
│   │   │   │       ├── index.ts
│   │   │   │       └── lib
│   │   │   │           ├── entities
│   │   │   │           │   ├── compliance.entity.ts
│   │   │   │           │   ├── notification.entity.ts
│   │   │   │           │   └── template.entity.ts
│   │   │   │           ├── notification-domain.module.ts
│   │   │   │           ├── notification-state-machine.ts
│   │   │   │           ├── notification.domain.ts
│   │   │   │           └── ports
│   │   │   │               ├── notification-dispatch.port.ts
│   │   │   │               └── notification-repository.port.ts
│   │   │   ├── infrastructure
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── adapters
│   │   │   │   │       │   ├── notification-dispatch.adapter.ts
│   │   │   │   │       │   └── notification-repository.adapter.ts
│   │   │   │   │       ├── controllers
│   │   │   │   │       │   ├── notification-callback.controller.spec.ts
│   │   │   │   │       │   └── notification-callback.controller.ts
│   │   │   │   │       ├── notification-infrastructure.module.ts
│   │   │   │   │       └── services
│   │   │   │   │           ├── email.service.ts
│   │   │   │   │           ├── push-notification.service.ts
│   │   │   │   │           └── sms.service.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   └── ui
│   │   │       ├── package.json
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── index.ts
│   │   │       │   ├── lib
│   │   │       │   │   ├── components
│   │   │       │   │   │   └── notifications
│   │   │       │   │   │       ├── notifications.page.html
│   │   │       │   │   │       ├── notifications.page.scss
│   │   │       │   │   │       ├── notifications.page.spec.ts
│   │   │       │   │   │       └── notifications.page.ts
│   │   │       │   │   └── services
│   │   │       │   │       └── notification-center.service.ts
│   │   │       │   └── test-setup.ts
│   │   │       ├── tsconfig.json
│   │   │       ├── tsconfig.lib.json
│   │   │       ├── tsconfig.spec.json
│   │   │       └── vitest.config.ts
│   │   ├── payroll
│   │   │   ├── application
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── lib
│   │   │   │   │   │   ├── payroll-application.module.ts
│   │   │   │   │   │   ├── payroll-application.spec.ts
│   │   │   │   │   │   ├── payroll-application.ts
│   │   │   │   │   │   └── use-cases
│   │   │   │   │   │       ├── calculate-payroll.use-case.ts
│   │   │   │   │   │       ├── get-employees.use-case.ts
│   │   │   │   │   │       └── stamp-payroll.use-case.ts
│   │   │   │   │   └── ports
│   │   │   │   │       └── fiscal-stamping.port.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── contracts
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── dtos
│   │   │   │   │       │   └── calculate-payroll.dto.ts
│   │   │   │   │       ├── enums
│   │   │   │   │       │   ├── attendance-status.enum.ts
│   │   │   │   │       │   ├── employee-status.enum.ts
│   │   │   │   │       │   ├── payroll-detail-type.enum.ts
│   │   │   │   │       │   ├── payroll-status.enum.ts
│   │   │   │   │       │   └── payroll-type.enum.ts
│   │   │   │   │       ├── payroll-contracts.spec.ts
│   │   │   │   │       └── payroll-contracts.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── domain
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── enums.ts
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── entities
│   │   │   │   │       │   ├── attendance.entity.ts
│   │   │   │   │       │   ├── employee.entity.ts
│   │   │   │   │       │   ├── payroll-detail.entity.ts
│   │   │   │   │       │   ├── payroll.entity.ts
│   │   │   │   │       │   └── tax-table.entity.ts
│   │   │   │   │       ├── enums
│   │   │   │   │       │   ├── attendance-status.enum.ts
│   │   │   │   │       │   ├── employee-status.enum.ts
│   │   │   │   │       │   ├── index.ts
│   │   │   │   │       │   ├── payroll-detail-type.enum.ts
│   │   │   │   │       │   ├── payroll-status.enum.ts
│   │   │   │   │       │   └── payroll-type.enum.ts
│   │   │   │   │       ├── events
│   │   │   │   │       │   └── payroll-stamped.event.ts
│   │   │   │   │       ├── exceptions
│   │   │   │   │       │   └── missing-tax-table.exception.ts
│   │   │   │   │       ├── payroll-domain.spec.ts
│   │   │   │   │       ├── payroll-domain.ts
│   │   │   │   │       ├── ports
│   │   │   │   │       │   ├── pac-provider.port.ts
│   │   │   │   │       │   ├── tax-service.port.ts
│   │   │   │   │       │   ├── tax-strategy.factory.ts
│   │   │   │   │       │   └── tenant-config.port.ts
│   │   │   │   │       ├── repositories
│   │   │   │   │       │   ├── attendance.repository.ts
│   │   │   │   │       │   ├── employee.repository.ts
│   │   │   │   │       │   ├── payroll.repository.ts
│   │   │   │   │       │   └── tax-table.repository.ts
│   │   │   │   │       └── services
│   │   │   │   │           ├── payroll-calculation.service.spec.ts
│   │   │   │   │           └── payroll-calculation.service.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── infrastructure
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── factories
│   │   │   │   │       │   └── tax-strategy.factory.ts
│   │   │   │   │       ├── payroll-infrastructure.module.ts
│   │   │   │   │       ├── payroll-infrastructure.spec.ts
│   │   │   │   │       ├── payroll-infrastructure.ts
│   │   │   │   │       ├── persistence
│   │   │   │   │       │   ├── entities
│   │   │   │   │       │   │   ├── attendance.orm-entity.ts
│   │   │   │   │       │   │   ├── employee.orm-entity.ts
│   │   │   │   │       │   │   ├── payroll-detail.orm-entity.ts
│   │   │   │   │       │   │   ├── payroll.orm-entity.ts
│   │   │   │   │       │   │   └── tax-table.orm-entity.ts
│   │   │   │   │       │   └── payroll.schemas.ts
│   │   │   │   │       ├── providers
│   │   │   │   │       │   └── finkok-pac.provider.ts
│   │   │   │   │       ├── repositories
│   │   │   │   │       │   ├── mikro-orm-attendance.repository.ts
│   │   │   │   │       │   ├── mikro-orm-employee.repository.ts
│   │   │   │   │       │   ├── mikro-orm-payroll.repository.ts
│   │   │   │   │       │   ├── mikro-orm-tax-table.repository.ts
│   │   │   │   │       │   └── mikro-orm-tenant-config.repository.ts
│   │   │   │   │       ├── seeds
│   │   │   │   │       │   └── initial-seeder.service.ts
│   │   │   │   │       └── strategies
│   │   │   │   │           ├── generic-latam.strategy.spec.ts
│   │   │   │   │           ├── generic-latam.strategy.ts
│   │   │   │   │           ├── mexican-tax.strategy.spec.ts
│   │   │   │   │           ├── mexican-tax.strategy.ts
│   │   │   │   │           └── us-payroll.strategy.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── presentation
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── controllers
│   │   │   │   │       │   └── payroll.controller.ts
│   │   │   │   │       ├── dto
│   │   │   │   │       │   ├── calculate-payroll.input.ts
│   │   │   │   │       │   └── employee.object.ts
│   │   │   │   │       ├── payroll-presentation.module.ts
│   │   │   │   │       ├── payroll-presentation.spec.ts
│   │   │   │   │       ├── payroll-presentation.ts
│   │   │   │   │       └── resolvers
│   │   │   │   │           └── payroll.resolver.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   └── ui
│   │   │       ├── package.json
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── index.ts
│   │   │       │   └── lib
│   │   │       │       └── lib.routes.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.lib.json
│   │   ├── pos
│   │   │   ├── application
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── ports
│   │   │   │   │       │   ├── native-capabilities.port.ts
│   │   │   │   │       │   └── pos-integration.ports.ts
│   │   │   │   │       └── use-cases
│   │   │   │   │           ├── open-shift.use-case.ts
│   │   │   │   │           ├── process-sale.use-case.ts
│   │   │   │   │           └── tests
│   │   │   │   │               └── process-sale.use-case.spec.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   └── tsconfig.spec.json
│   │   │   ├── domain
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── entities
│   │   │   │   │       │   └── pos.entity.ts
│   │   │   │   │       ├── ports
│   │   │   │   │       │   └── hardware-bridge.port.ts
│   │   │   │   │       └── repositories
│   │   │   │   │           └── pos.repository.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   └── tsconfig.spec.json
│   │   │   ├── infrastructure
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── adapters
│   │   │   │   │       │   ├── grpc-pos-integration.adapter.ts
│   │   │   │   │       │   └── hardware-bridge.adapter.ts
│   │   │   │   │       ├── entities
│   │   │   │   │       │   └── pos.schema.ts
│   │   │   │   │       ├── pos-infrastructure.module.ts
│   │   │   │   │       ├── repositories
│   │   │   │   │       │   └── mikro-orm-pos.repository.ts
│   │   │   │   │       └── tests
│   │   │   │   │           └── pos-persistence.spec.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   └── tsconfig.spec.json
│   │   │   └── ui
│   │   │       ├── package.json
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── index.ts
│   │   │       │   ├── lib
│   │   │       │   │   ├── lib.routes.ts
│   │   │       │   │   └── pages
│   │   │       │   │       └── pos-terminal
│   │   │       │   │           ├── pos-terminal.component.spec.ts
│   │   │       │   │           └── pos-terminal.component.ts
│   │   │       │   └── test-setup.ts
│   │   │       ├── tsconfig.json
│   │   │       ├── tsconfig.lib.json
│   │   │       ├── tsconfig.spec.json
│   │   │       ├── vite.config.mts
│   │   │       └── vitest.config.ts
│   │   ├── projects
│   │   │   ├── application
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── projects-application.spec.ts
│   │   │   │   │       ├── projects-application.ts
│   │   │   │   │       └── use-cases
│   │   │   │   │           ├── add-task.use-case.ts
│   │   │   │   │           ├── create-project.use-case.ts
│   │   │   │   │           ├── get-my-work.use-case.ts
│   │   │   │   │           └── get-projects.use-case.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── contracts
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── enums
│   │   │   │   │       │   ├── project-status.enum.ts
│   │   │   │   │       │   ├── projects.enums.ts
│   │   │   │   │       │   └── task-status.enum.ts
│   │   │   │   │       ├── projects-contracts.spec.ts
│   │   │   │   │       └── projects-contracts.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── domain
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── entities
│   │   │   │   │       │   ├── project.entity.ts
│   │   │   │   │       │   └── task.entity.ts
│   │   │   │   │       ├── ports
│   │   │   │   │       │   └── project.repository.ts
│   │   │   │   │       ├── projects-domain.spec.ts
│   │   │   │   │       └── projects-domain.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── infrastructure
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── persistence
│   │   │   │   │       │   └── projects.schemas.ts
│   │   │   │   │       ├── projects-infrastructure.spec.ts
│   │   │   │   │       ├── projects-infrastructure.ts
│   │   │   │   │       └── repositories
│   │   │   │   │           └── mikro-orm-project.repository.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── presentation
│   │   │   │   ├── README.md
│   │   │   │   ├── eslint.config.mjs
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── controllers
│   │   │   │   │       │   └── projects.controller.ts
│   │   │   │   │       ├── projects-presentation.module.ts
│   │   │   │   │       ├── projects-presentation.spec.ts
│   │   │   │   │       └── projects-presentation.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   └── ui
│   │   │       ├── package.json
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── index.ts
│   │   │       │   └── lib
│   │   │       │       └── lib.routes.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.lib.json
│   │   ├── provisioning-federation
│   │   │   ├── application
│   │   │   │   ├── README.md
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── domain-provisioning-federation-application.module.ts
│   │   │   │   │       └── sync-external-idp.use-case.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   ├── contracts
│   │   │   │   ├── README.md
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       └── domain-provisioning-federation-contracts.module.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   ├── domain
│   │   │   │   ├── README.md
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       └── domain-provisioning-federation-domain.module.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   ├── infrastructure
│   │   │   │   ├── README.md
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       └── domain-provisioning-federation-infrastructure.module.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   └── presentation
│   │   │       ├── README.md
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── index.ts
│   │   │       │   └── lib
│   │   │       │       └── domain-provisioning-federation-presentation.module.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.lib.json
│   │   ├── purchasing
│   │   │   ├── application
│   │   │   │   ├── README.md
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── index.ts
│   │   │   │   │       ├── purchasing-application.module.ts
│   │   │   │   │       └── use-cases
│   │   │   │   │           ├── approve-requisition.use-case.ts
│   │   │   │   │           ├── create-purchase-order.use-case.ts
│   │   │   │   │           ├── create-requisition.use-case.ts
│   │   │   │   │           ├── create-supplier.use-case.spec.ts
│   │   │   │   │           ├── create-supplier.use-case.ts
│   │   │   │   │           ├── create-vendor-bill.use-case.ts
│   │   │   │   │           ├── get-requisitions.use-case.ts
│   │   │   │   │           ├── get-vendor-bill.use-case.ts
│   │   │   │   │           ├── reject-requisition.use-case.ts
│   │   │   │   │           └── update-vendor-bill.use-case.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── contracts
│   │   │   │   ├── README.md
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── dtos
│   │   │   │   │       │   ├── create-purchase-order.dto.ts
│   │   │   │   │       │   ├── create-requisition.dto.ts
│   │   │   │   │       │   ├── create-supplier.dto.ts
│   │   │   │   │       │   └── create-vendor-bill.dto.ts
│   │   │   │   │       ├── enums
│   │   │   │   │       │   ├── purchase-order-status.enum.ts
│   │   │   │   │       │   └── supplier-type.enum.ts
│   │   │   │   │       ├── index.ts
│   │   │   │   │       └── models
│   │   │   │   │           └── supplier.model.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   ├── domain
│   │   │   │   ├── README.md
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── entities
│   │   │   │   │       │   ├── purchase-order.entity.ts
│   │   │   │   │       │   ├── requisition.entity.ts
│   │   │   │   │       │   ├── supplier.entity.ts
│   │   │   │   │       │   └── vendor-bill.entity.ts
│   │   │   │   │       ├── enums
│   │   │   │   │       │   ├── purchase-order-status.enum.ts
│   │   │   │   │       │   └── supplier-type.enum.ts
│   │   │   │   │       ├── index.ts
│   │   │   │   │       ├── ports
│   │   │   │   │       │   ├── purchase-order.repository.port.ts
│   │   │   │   │       │   └── supplier.repository.port.ts
│   │   │   │   │       └── repositories
│   │   │   │   │           ├── requisition.repository.ts
│   │   │   │   │           └── vendor-bill.repository.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── infrastructure
│   │   │   │   ├── README.md
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── index.ts
│   │   │   │   │       ├── persistence
│   │   │   │   │       │   └── purchasing.schemas.ts
│   │   │   │   │       ├── purchasing-infrastructure.module.ts
│   │   │   │   │       └── repositories
│   │   │   │   │           ├── mikro-orm-purchase-order.repository.ts
│   │   │   │   │           ├── mikro-orm-requisition.repository.ts
│   │   │   │   │           ├── mikro-orm-supplier.repository.ts
│   │   │   │   │           └── mikro-orm-vendor-bill.repository.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   ├── tsconfig.spec.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── presentation
│   │   │   │   ├── README.md
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── controllers
│   │   │   │   │       │   ├── approvals.controller.ts
│   │   │   │   │       │   └── purchasing.controller.ts
│   │   │   │   │       ├── index.ts
│   │   │   │   │       ├── purchasing-presentation.module.ts
│   │   │   │   │       └── resolvers
│   │   │   │   │           └── purchasing.resolver.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   └── ui
│   │   │       ├── package.json
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── index.ts
│   │   │       │   └── lib
│   │   │       │       └── lib.routes.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.lib.json
│   │   ├── risk-adaptive-auth
│   │   │   ├── application
│   │   │   │   ├── README.md
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── calculate-risk.use-case.ts
│   │   │   │   │       └── domain-risk-adaptive-auth-application.module.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   ├── contracts
│   │   │   │   ├── README.md
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       └── domain-risk-adaptive-auth-contracts.module.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   ├── domain
│   │   │   │   ├── README.md
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       └── domain-risk-adaptive-auth-domain.module.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   ├── infrastructure
│   │   │   │   ├── README.md
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       └── domain-risk-adaptive-auth-infrastructure.module.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   └── presentation
│   │   │       ├── README.md
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── index.ts
│   │   │       │   └── lib
│   │   │       │       └── domain-risk-adaptive-auth-presentation.module.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.lib.json
│   │   ├── scheduler
│   │   │   ├── application
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── job-orchestrator.ts
│   │   │   │   │       ├── job-processor.service.spec.ts
│   │   │   │   │       ├── job-processor.service.ts
│   │   │   │   │       ├── ports
│   │   │   │   │       │   └── job-handler.port.ts
│   │   │   │   │       ├── scheduler-application.module.ts
│   │   │   │   │       └── scheduler.service.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── domain
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── entities
│   │   │   │   │       │   └── job.entity.ts
│   │   │   │   │       ├── job-state-machine.spec.ts
│   │   │   │   │       ├── job-state-machine.ts
│   │   │   │   │       └── scheduler-domain.module.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   └── infrastructure
│   │   │       ├── package.json
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── index.ts
│   │   │       │   └── lib
│   │   │       │       ├── scheduler-infrastructure.module.ts
│   │   │       │       └── services
│   │   │       │           ├── distributed-lock.service.ts
│   │   │       │           ├── rate-limiter.service.spec.ts
│   │   │       │           ├── rate-limiter.service.ts
│   │   │       │           ├── secure-logger.service.ts
│   │   │       │           └── telemetry.service.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.lib.json
│   │   ├── session
│   │   │   ├── application
│   │   │   │   ├── README.md
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── create-session.use-case.ts
│   │   │   │   │       ├── domain-session-application.module.ts
│   │   │   │   │       └── start-session.use-case.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   ├── contracts
│   │   │   │   ├── README.md
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       └── domain-session-contracts.module.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   ├── domain
│   │   │   │   ├── README.md
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── domain-session-domain.module.ts
│   │   │   │   │       └── session.entity.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   ├── infrastructure
│   │   │   │   ├── README.md
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       └── domain-session-infrastructure.module.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   └── presentation
│   │   │       ├── README.md
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── index.ts
│   │   │       │   └── lib
│   │   │       │       ├── controllers
│   │   │       │       │   └── session.controller.ts
│   │   │       │       └── domain-session-presentation.module.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.lib.json
│   │   ├── subscription
│   │   │   ├── application
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── ports.ts
│   │   │   │   │       ├── subscription-application.module.ts
│   │   │   │   │       └── use-cases
│   │   │   │   │           ├── change-subscription-plan.use-case.ts
│   │   │   │   │           ├── create-checkout-session.use-case.ts
│   │   │   │   │           ├── create-portal-session.use-case.ts
│   │   │   │   │           ├── get-subscription-plans.use-case.ts
│   │   │   │   │           ├── get-subscription-status.use-case.ts
│   │   │   │   │           ├── get-subscription.use-case.ts
│   │   │   │   │           ├── handle-invoice-paid.use-case.ts
│   │   │   │   │           ├── handle-subscription-deleted.use-case.ts
│   │   │   │   │           ├── handle-subscription-updated.use-case.ts
│   │   │   │   │           ├── process-checkout-success.use-case.ts
│   │   │   │   │           ├── process-stripe-webhook.use-case.ts
│   │   │   │   │           ├── subscribe-to-plan.use-case.ts
│   │   │   │   │           └── update-tenant-plan.use-case.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── contracts
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── models
│   │   │   │   │       │   └── plan.model.ts
│   │   │   │   │       └── use-case.contracts.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   ├── domain
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── entities
│   │   │   │   │       │   ├── subscription-plan.entity.ts
│   │   │   │   │       │   ├── subscription.entity.spec.ts
│   │   │   │   │       │   └── subscription.entity.ts
│   │   │   │   │       ├── ports
│   │   │   │   │       │   ├── customer-registry.port.ts
│   │   │   │   │       │   ├── payment-session-provider.port.ts
│   │   │   │   │       │   └── subscription-provider.port.ts
│   │   │   │   │       ├── repositories
│   │   │   │   │       │   ├── subscription-plan.repository.ts
│   │   │   │   │       │   └── subscription.repository.ts
│   │   │   │   │       ├── services
│   │   │   │   │       │   ├── customer-identity.service.ts
│   │   │   │   │       │   ├── plan-limit.mapper.ts
│   │   │   │   │       │   ├── stripe-runtime-config.service.spec.ts
│   │   │   │   │       │   └── stripe-runtime-config.service.ts
│   │   │   │   │       └── subscription-domain.module.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── infrastructure
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── adapters
│   │   │   │   │       │   ├── stripe-subscription.adapter.ts
│   │   │   │   │       │   ├── stripe.mapper.spec.ts
│   │   │   │   │       │   └── stripe.mapper.ts
│   │   │   │   │       ├── listeners
│   │   │   │   │       │   └── stripe-subscription.listener.ts
│   │   │   │   │       ├── persistence
│   │   │   │   │       │   └── subscription.schemas.ts
│   │   │   │   │       ├── repositories
│   │   │   │   │       │   ├── mikro-orm-subscription-plan.repository.ts
│   │   │   │   │       │   └── mikro-orm-subscription.repository.ts
│   │   │   │   │       ├── subscription-infrastructure.module.ts
│   │   │   │   │       └── subscription-persistence.module.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   └── vitest.config.ts
│   │   │   └── presentation
│   │   │       ├── package.json
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── index.ts
│   │   │       │   └── lib
│   │   │       │       ├── controllers
│   │   │       │       │   ├── stripe-webhook.controller.ts
│   │   │       │       │   └── subscription.controller.ts
│   │   │       │       └── subscription-presentation.module.ts
│   │   │       ├── tsconfig.json
│   │   │       ├── tsconfig.lib.json
│   │   │       └── vitest.config.ts
│   │   ├── token
│   │   │   ├── application
│   │   │   │   ├── README.md
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── domain-token-application.module.ts
│   │   │   │   │       └── issue-token.use-case.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   ├── contracts
│   │   │   │   ├── README.md
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       └── domain-token-contracts.module.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   ├── domain
│   │   │   │   ├── README.md
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── domain-token-domain.module.ts
│   │   │   │   │       └── token.service.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   ├── infrastructure
│   │   │   │   ├── README.md
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       └── domain-token-infrastructure.module.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   └── tsconfig.lib.json
│   │   │   └── presentation
│   │   │       ├── README.md
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── index.ts
│   │   │       │   └── lib
│   │   │       │       └── domain-token-presentation.module.ts
│   │   │       ├── tsconfig.json
│   │   │       └── tsconfig.lib.json
│   │   └── treasury
│   │       ├── application
│   │       │   ├── README.md
│   │       │   ├── eslint.config.mjs
│   │       │   ├── package.json
│   │       │   ├── project.json
│   │       │   ├── src
│   │       │   │   ├── index.ts
│   │       │   │   └── lib
│   │       │   │       ├── services
│   │       │   │       │   ├── bank-statement-parser.service.ts
│   │       │   │       │   ├── reconciliation.service.hardening.spec.ts
│   │       │   │       │   ├── reconciliation.service.spec.ts
│   │       │   │       │   └── reconciliation.service.ts
│   │       │   │       ├── treasury-application.module.ts
│   │       │   │       ├── treasury-application.spec.ts
│   │       │   │       ├── treasury-application.ts
│   │       │   │       └── use-cases
│   │       │   │           ├── create-bank-account.use-case.ts
│   │       │   │           ├── get-bank-accounts.use-case.ts
│   │       │   │           ├── get-cash-flow.use-case.ts
│   │       │   │           ├── reconcile-bank-statement.use-case.ts
│   │       │   │           └── register-transaction.use-case.ts
│   │       │   ├── tsconfig.json
│   │       │   ├── tsconfig.lib.json
│   │       │   ├── tsconfig.spec.json
│   │       │   └── vitest.config.ts
│   │       ├── contracts
│   │       │   ├── README.md
│   │       │   ├── eslint.config.mjs
│   │       │   ├── package.json
│   │       │   ├── project.json
│   │       │   ├── src
│   │       │   │   ├── index.ts
│   │       │   │   └── lib
│   │       │   │       ├── dtos
│   │       │   │       │   ├── bank-account.dto.ts
│   │       │   │       │   ├── create-bank-account.dto.ts
│   │       │   │       │   ├── register-transaction.dto.ts
│   │       │   │       │   └── transaction.dto.ts
│   │       │   │       ├── enums
│   │       │   │       │   ├── cash-flow-type.enum.ts
│   │       │   │       │   ├── transaction-type.enum.ts
│   │       │   │       │   └── treasury.enums.ts
│   │       │   │       ├── ports
│   │       │   │       │   └── bank-statement-parser.port.ts
│   │       │   │       ├── treasury-contracts.spec.ts
│   │       │   │       └── treasury-contracts.ts
│   │       │   ├── tsconfig.json
│   │       │   ├── tsconfig.lib.json
│   │       │   ├── tsconfig.spec.json
│   │       │   └── vitest.config.ts
│   │       ├── domain
│   │       │   ├── README.md
│   │       │   ├── eslint.config.mjs
│   │       │   ├── package.json
│   │       │   ├── project.json
│   │       │   ├── src
│   │       │   │   ├── index.ts
│   │       │   │   └── lib
│   │       │   │       ├── entities
│   │       │   │       │   ├── bank-account.entity.ts
│   │       │   │       │   ├── cash-flow.entity.ts
│   │       │   │       │   └── transaction.entity.ts
│   │       │   │       ├── repositories
│   │       │   │       │   ├── bank-account.repository.ts
│   │       │   │       │   └── transaction.repository.ts
│   │       │   │       ├── treasury-domain.spec.ts
│   │       │   │       └── treasury-domain.ts
│   │       │   ├── tsconfig.json
│   │       │   ├── tsconfig.lib.json
│   │       │   ├── tsconfig.spec.json
│   │       │   └── vitest.config.ts
│   │       ├── infrastructure
│   │       │   ├── README.md
│   │       │   ├── eslint.config.mjs
│   │       │   ├── package.json
│   │       │   ├── project.json
│   │       │   ├── src
│   │       │   │   ├── index.ts
│   │       │   │   └── lib
│   │       │   │       ├── parsers
│   │       │   │       │   ├── csv-parser.ts
│   │       │   │       │   ├── ofx-parser.ts
│   │       │   │       │   └── parser.interface.ts
│   │       │   │       ├── persistence
│   │       │   │       │   └── treasury.schemas.ts
│   │       │   │       ├── repositories
│   │       │   │       │   ├── mikro-orm-bank-account.repository.ts
│   │       │   │       │   └── mikro-orm-transaction.repository.ts
│   │       │   │       ├── treasury-infrastructure.module.ts
│   │       │   │       ├── treasury-infrastructure.spec.ts
│   │       │   │       └── treasury-infrastructure.ts
│   │       │   ├── tsconfig.json
│   │       │   ├── tsconfig.lib.json
│   │       │   ├── tsconfig.spec.json
│   │       │   └── vitest.config.ts
│   │       ├── presentation
│   │       │   ├── README.md
│   │       │   ├── eslint.config.mjs
│   │       │   ├── package.json
│   │       │   ├── project.json
│   │       │   ├── src
│   │       │   │   ├── index.ts
│   │       │   │   └── lib
│   │       │   │       ├── controllers
│   │       │   │       │   └── treasury.controller.ts
│   │       │   │       ├── resolvers
│   │       │   │       │   └── treasury.resolver.ts
│   │       │   │       ├── treasury-presentation.module.ts
│   │       │   │       ├── treasury-presentation.spec.ts
│   │       │   │       └── treasury-presentation.ts
│   │       │   ├── tsconfig.json
│   │       │   ├── tsconfig.lib.json
│   │       │   ├── tsconfig.spec.json
│   │       │   └── vitest.config.ts
│   │       └── ui
│   │           ├── package.json
│   │           ├── project.json
│   │           ├── src
│   │           │   ├── index.ts
│   │           │   └── lib
│   │           │       └── lib.routes.ts
│   │           ├── tsconfig.json
│   │           └── tsconfig.lib.json
│   ├── kernel
│   │   ├── audit
│   │   │   ├── README.md
│   │   │   ├── package.json
│   │   │   ├── project.json
│   │   │   ├── src
│   │   │   │   ├── index.ts
│   │   │   │   └── lib
│   │   │   │       ├── audit.module.ts
│   │   │   │       ├── entities
│   │   │   │       │   └── data-audit-log.entity.ts
│   │   │   │       └── subscribers
│   │   │   │           └── data-audit.subscriber.ts
│   │   │   ├── tsconfig.json
│   │   │   └── tsconfig.lib.json
│   │   ├── auth
│   │   │   ├── README.md
│   │   │   ├── eslint.config.mjs
│   │   │   ├── jest.config.cts
│   │   │   ├── package.json
│   │   │   ├── project.json
│   │   │   ├── src
│   │   │   │   ├── index.ts
│   │   │   │   └── lib
│   │   │   │       ├── abac
│   │   │   │       │   ├── abac.decorator.ts
│   │   │   │       │   └── abac.guard.ts
│   │   │   │       ├── auth.module.ts
│   │   │   │       ├── auth.spec.ts.disabled
│   │   │   │       ├── cookie-policy.ts
│   │   │   │       ├── decorators
│   │   │   │       │   ├── current-user.decorator.ts
│   │   │   │       │   ├── public.decorator.ts
│   │   │   │       │   ├── roles.decorator.ts
│   │   │   │       │   └── step-up.decorator.ts
│   │   │   │       ├── guards
│   │   │   │       │   ├── jwt-auth.guard.ts
│   │   │   │       │   ├── roles.guard.ts
│   │   │   │       │   ├── step-up.guard.spec.ts
│   │   │   │       │   ├── step-up.guard.ts
│   │   │   │       │   └── tenant.guard.ts
│   │   │   │       ├── interfaces
│   │   │   │       │   ├── express.interface.ts
│   │   │   │       │   ├── secret-provider.interface.ts
│   │   │   │       │   └── session-validator.interface.ts
│   │   │   │       ├── middleware
│   │   │   │       │   ├── canonical-tenant.middleware.ts
│   │   │   │       │   └── csrf.middleware.ts
│   │   │   │       ├── services
│   │   │   │       │   ├── cookie-policy.service.ts
│   │   │   │       │   ├── jwt-token.service.spec.ts
│   │   │   │       │   ├── jwt-token.service.ts
│   │   │   │       │   ├── mfa-helper.service.spec.ts
│   │   │   │       │   ├── mfa-helper.service.ts
│   │   │   │       │   ├── providers
│   │   │   │       │   │   ├── composite-secret.provider.ts
│   │   │   │       │   │   ├── default-secret.provider.ts
│   │   │   │       │   │   ├── kms-secret.provider.spec.ts
│   │   │   │       │   │   ├── kms-secret.provider.ts
│   │   │   │       │   │   └── vault-secret.provider.ts
│   │   │   │       │   ├── secret-manager.service.hardening.spec.ts
│   │   │   │       │   ├── secret-manager.service.ts
│   │   │   │       │   ├── tenant-context-contract.service.spec.ts
│   │   │   │       │   └── tenant-context-contract.service.ts
│   │   │   │       ├── storage
│   │   │   │       │   └── tenant-context.storage.ts
│   │   │   │       └── strategies
│   │   │   │           └── jwt.strategy.ts
│   │   │   ├── tsconfig.json
│   │   │   ├── tsconfig.lib.json
│   │   │   ├── tsconfig.spec.json
│   │   │   └── vitest.config.ts
│   │   ├── bff-core
│   │   │   ├── jest.config.ts
│   │   │   ├── project.json
│   │   │   ├── src
│   │   │   │   ├── index.ts
│   │   │   │   └── lib
│   │   │   │       ├── bff-core.module.ts
│   │   │   │       ├── client
│   │   │   │       │   └── resilient-http.client.ts
│   │   │   │       ├── filters
│   │   │   │       │   └── global-bff-exception.filter.ts
│   │   │   │       ├── guards
│   │   │   │       │   └── bff-auth.guard.ts
│   │   │   │       └── middleware
│   │   │   │           ├── tenant-context.middleware.spec.ts
│   │   │   │           └── tenant-context.middleware.ts
│   │   │   ├── tsconfig.lib.json
│   │   │   └── tsconfig.spec.json
│   │   ├── constants
│   │   │   ├── package.json
│   │   │   └── src
│   │   │       ├── index.ts
│   │   │       └── lib
│   │   │           └── countries.ts
│   │   ├── entitlements
│   │   │   ├── package.json
│   │   │   ├── project.json
│   │   │   ├── src
│   │   │   │   ├── index.ts
│   │   │   │   └── lib
│   │   │   │       ├── entitlement-centralized-quota.spec.ts
│   │   │   │       ├── entitlement-quota.spec.ts
│   │   │   │       ├── entitlement.guard.ts
│   │   │   │       ├── entitlement.service.spec.ts
│   │   │   │       ├── entitlement.service.ts
│   │   │   │       ├── entitlements.module.ts
│   │   │   │       └── require-entitlement.decorator.ts
│   │   │   ├── tsconfig.json
│   │   │   ├── tsconfig.lib.json
│   │   │   ├── tsconfig.spec.json
│   │   │   └── vitest.config.ts
│   │   ├── exceptions
│   │   │   ├── README.md
│   │   │   ├── eslint.config.mjs
│   │   │   ├── jest.config.cts
│   │   │   ├── package.json
│   │   │   ├── project.json
│   │   │   ├── src
│   │   │   │   ├── index.ts
│   │   │   │   └── lib
│   │   │   │       ├── exceptions.spec.ts
│   │   │   │       ├── exceptions.ts
│   │   │   │       └── global-exception.filter.ts
│   │   │   ├── tsconfig.json
│   │   │   ├── tsconfig.lib.json
│   │   │   ├── tsconfig.spec.json
│   │   │   └── vitest.config.ts
│   │   ├── federation
│   │   │   ├── package.json
│   │   │   └── src
│   │   │       ├── index.ts
│   │   │       └── lib
│   │   │           ├── federation-support.module.ts
│   │   │           └── health.resolver.ts
│   │   ├── http
│   │   │   ├── package.json
│   │   │   └── src
│   │   │       ├── index.ts
│   │   │       └── lib
│   │   │           └── filters
│   │   │               └── global-exception.filter.ts
│   │   ├── idempotency
│   │   │   ├── package.json
│   │   │   └── src
│   │   │       ├── index.ts
│   │   │       └── lib
│   │   │           ├── interceptors
│   │   │           │   └── idempotency.interceptor.ts
│   │   │           └── services
│   │   │               └── idempotency.service.ts
│   │   ├── messaging
│   │   │   ├── README.md
│   │   │   ├── eslint.config.mjs
│   │   │   ├── jest.config.cts
│   │   │   ├── package.json
│   │   │   ├── project.json
│   │   │   ├── src
│   │   │   │   ├── index.ts
│   │   │   │   └── lib
│   │   │   │       ├── egress-proxy.service.ts
│   │   │   │       ├── entities
│   │   │   │       │   ├── inbox-message.entity.ts
│   │   │   │       │   └── outbox-event.entity.ts
│   │   │   │       ├── inbox.service.ts
│   │   │   │       ├── messaging.module.ts
│   │   │   │       ├── outbox-reconciliation.service.ts
│   │   │   │       ├── outbox.processor.ts
│   │   │   │       ├── outbox.service.spec.ts
│   │   │   │       ├── outbox.service.ts
│   │   │   │       └── saga
│   │   │   │           └── saga-orchestrator.ts
│   │   │   ├── tsconfig.json
│   │   │   ├── tsconfig.lib.json
│   │   │   └── tsconfig.spec.json
│   │   ├── telemetry
│   │   │   ├── README.md
│   │   │   ├── eslint.config.mjs
│   │   │   ├── jest.config.cts
│   │   │   ├── package.json
│   │   │   ├── project.json
│   │   │   ├── src
│   │   │   │   ├── index.ts
│   │   │   │   └── lib
│   │   │   │       ├── mikro-orm
│   │   │   │       │   └── database-telemetry.logger.ts
│   │   │   │       ├── persistence-metrics.service.ts
│   │   │   │       ├── telemetry.interface.ts
│   │   │   │       ├── telemetry.module.ts
│   │   │   │       ├── telemetry.spec.ts
│   │   │   │       ├── telemetry.ts
│   │   │   │       └── tenant-context-proxy.ts
│   │   │   ├── tsconfig.json
│   │   │   ├── tsconfig.lib.json
│   │   │   └── tsconfig.spec.json
│   │   ├── telemetry-interfaces
│   │   │   ├── package.json
│   │   │   ├── project.json
│   │   │   ├── src
│   │   │   │   ├── index.ts
│   │   │   │   └── lib
│   │   │   │       ├── telemetry.module.ts
│   │   │   │       └── telemetry.service.interface.ts
│   │   │   ├── tsconfig.json
│   │   │   └── tsconfig.lib.json
│   │   ├── tenant
│   │   │   ├── README.md
│   │   │   ├── eslint.config.mjs
│   │   │   ├── jest.config.cts
│   │   │   ├── package.json
│   │   │   ├── project.json
│   │   │   ├── src
│   │   │   │   ├── index.ts
│   │   │   │   └── lib
│   │   │   │       ├── controllers
│   │   │   │       │   ├── feature-flags.controller.ts
│   │   │   │       │   └── residency-auditor.controller.ts
│   │   │   │       ├── dual-write-manager.ts
│   │   │   │       ├── entities
│   │   │   │       │   ├── tenant-control-record.entity.ts
│   │   │   │       │   ├── tenant-operation.entity.ts
│   │   │   │       │   ├── tenant-routing-snapshot.entity.ts
│   │   │   │       │   └── tenant.entity.ts
│   │   │   │       ├── failover.service.ts
│   │   │   │       ├── finops.service.ts
│   │   │   │       ├── guards
│   │   │   │       │   ├── regional-residency.guard.ts
│   │   │   │       │   └── tenant-throttler.guard.ts
│   │   │   │       ├── interceptors
│   │   │   │       │   ├── tenant-rls.interceptor.spec.ts
│   │   │   │       │   └── tenant-rls.interceptor.ts
│   │   │   │       ├── interfaces
│   │   │   │       │   ├── tenant-config.interface.ts
│   │   │   │       │   └── tenant-context.interface.ts
│   │   │   │       ├── migration-guard.ts
│   │   │   │       ├── migration-orchestrator.service.ts
│   │   │   │       ├── residency-compliance.service.ts
│   │   │   │       ├── residency-policy.util.ts
│   │   │   │       ├── routing-plane.service.ts
│   │   │   │       ├── subscribers
│   │   │   │       │   └── tenant-model.subscriber.ts
│   │   │   │       ├── tenant-context.storage.ts
│   │   │   │       ├── tenant-critical-config.service.ts
│   │   │   │       ├── tenant-operation.service.ts
│   │   │   │       ├── tenant-security-baseline.module.ts
│   │   │   │       ├── tenant.module.ts
│   │   │   │       ├── tenant.service.spec.ts
│   │   │   │       ├── tenant.service.ts
│   │   │   │       └── tests
│   │   │   │           ├── adversarial-isolation.spec.ts
│   │   │   │           ├── evidence-bundle.spec.ts
│   │   │   │           ├── failover-validation.spec.ts
│   │   │   │           ├── finops-precision.spec.ts
│   │   │   │           ├── integrated-level5.spec.ts
│   │   │   │           ├── journal-integrity.spec.ts
│   │   │   │           ├── migration-realdb.spec.ts
│   │   │   │           ├── migration-validation.spec.ts
│   │   │   │           ├── tenant-isolation.integration.spec.ts
│   │   │   │           └── tenant-lifecycle.integration.spec.ts
│   │   │   ├── tsconfig.json
│   │   │   ├── tsconfig.lib.json
│   │   │   ├── tsconfig.spec.json
│   │   │   └── vitest.config.ts
│   │   └── tenant-context
│   │       ├── package.json
│   │       ├── project.json
│   │       ├── src
│   │       │   ├── index.ts
│   │       │   └── lib
│   │       │       ├── decorators
│   │       │       │   └── current-tenant.decorator.ts
│   │       │       ├── signed-tenant-context.interface.ts
│   │       │       ├── tenant-context.interface.ts
│   │       │       └── tenant-context.storage.ts
│   │       ├── tsconfig.json
│   │       └── tsconfig.lib.json
│   ├── platform
│   │   ├── audit
│   │   │   ├── package.json
│   │   │   ├── project.json
│   │   │   ├── src
│   │   │   │   ├── index.ts
│   │   │   │   └── lib
│   │   │   │       ├── audit-ledger.service.ts
│   │   │   │       ├── audit.module.ts
│   │   │   │       ├── entities
│   │   │   │       │   └── audit-ledger.entity.ts
│   │   │   │       └── tests
│   │   │   │           └── audit-ledger.spec.ts
│   │   │   ├── tsconfig.json
│   │   │   └── tsconfig.lib.json
│   │   ├── cache
│   │   │   ├── package.json
│   │   │   ├── project.json
│   │   │   ├── src
│   │   │   │   ├── index.ts
│   │   │   │   └── lib
│   │   │   │       ├── redis-cache.module.ts
│   │   │   │       ├── redis-cache.service.spec.ts
│   │   │   │       └── redis-cache.service.ts
│   │   │   ├── tsconfig.json
│   │   │   ├── tsconfig.lib.json
│   │   │   ├── tsconfig.spec.json
│   │   │   └── vitest.config.ts
│   │   ├── contract-governance
│   │   │   ├── TAXONOMY.md
│   │   │   ├── package.json
│   │   │   ├── project.json
│   │   │   ├── src
│   │   │   │   ├── index.ts
│   │   │   │   └── lib
│   │   │   │       ├── complexity.ts
│   │   │   │       ├── directives
│   │   │   │       │   └── auth.directive.ts
│   │   │   │       └── registry.ts
│   │   │   ├── tsconfig.json
│   │   │   └── tsconfig.lib.json
│   │   ├── data-quality
│   │   │   ├── package.json
│   │   │   ├── project.json
│   │   │   ├── src
│   │   │   │   ├── index.ts
│   │   │   │   └── lib
│   │   │   │       ├── data-quality.module.ts
│   │   │   │       ├── data-quality.service.ts
│   │   │   │       └── data-quality.ts
│   │   │   ├── tsconfig.json
│   │   │   └── tsconfig.lib.json
│   │   ├── desktop
│   │   │   ├── core
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       └── desktop-offline-sync.adapter.ts
│   │   │   │   └── tsconfig.lib.json
│   │   │   ├── file-system
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── file-system.api.spec.ts
│   │   │   │   │       └── file-system.api.ts
│   │   │   │   ├── tsconfig.json
│   │   │   │   ├── tsconfig.lib.json
│   │   │   │   └── vitest.config.ts
│   │   │   ├── hardware
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       └── desktop-cash-drawer.adapter.ts
│   │   │   │   └── tsconfig.lib.json
│   │   │   ├── printing
│   │   │   │   ├── package.json
│   │   │   │   ├── project.json
│   │   │   │   ├── src
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lib
│   │   │   │   │       ├── desktop-receipt-printer.adapter.ts
│   │   │   │   │       └── tests
│   │   │   │   │           └── desktop-receipt-printer.adapter.spec.ts
│   │   │   │   └── tsconfig.lib.json
│   │   │   └── storage
│   │   │       ├── package.json
│   │   │       ├── project.json
│   │   │       ├── src
│   │   │       │   ├── index.ts
│   │   │       │   └── lib
│   │   │       │       └── desktop-local-journal.adapter.ts
│   │   │       └── tsconfig.lib.json
│   │   ├── kafka
│   │   │   ├── README.md
│   │   │   ├── jest.config.cts
│   │   │   ├── package.json
│   │   │   ├── project.json
│   │   │   ├── src
│   │   │   │   ├── index.ts
│   │   │   │   └── lib
│   │   │   │       └── kafka.module.ts
│   │   │   ├── tsconfig.json
│   │   │   ├── tsconfig.lib.json
│   │   │   └── tsconfig.spec.json
│   │   ├── nats
│   │   │   ├── package.json
│   │   │   ├── project.json
│   │   │   ├── src
│   │   │   │   ├── index.ts
│   │   │   │   └── lib
│   │   │   │       └── nats.module.ts
│   │   │   └── tsconfig.lib.json
│   │   ├── onboarding-orchestrator
│   │   │   └── src
│   │   │       ├── index.ts
│   │   │       └── lib
│   │   │           └── onboard-tenant.saga.ts
│   │   ├── storage
│   │   │   ├── package.json
│   │   │   ├── project.json
│   │   │   ├── src
│   │   │   │   ├── index.ts
│   │   │   │   └── lib
│   │   │   │       ├── adapters
│   │   │   │       │   ├── aws-secret-manager.adapter.ts
│   │   │   │       │   ├── filesystem-storage.adapter.ts
│   │   │   │       │   └── s3-storage.adapter.ts
│   │   │   │       └── ports
│   │   │   │           ├── secret-manager.port.ts
│   │   │   │           └── storage.port.ts
│   │   │   └── tsconfig.lib.json
│   │   └── xslt
│   │       ├── README.md
│   │       ├── eslint.config.mjs
│   │       ├── jest.config.cts
│   │       ├── package.json
│   │       ├── project.json
│   │       ├── src
│   │       │   ├── index.ts
│   │       │   └── lib
│   │       │       ├── xslt.module.ts
│   │       │       ├── xslt.service.ts
│   │       │       ├── xslt.spec.ts
│   │       │       └── xslt.ts
│   │       ├── tsconfig.json
│   │       ├── tsconfig.lib.json
│   │       └── tsconfig.spec.json
│   └── shared
│       ├── config
│       │   ├── project.json
│       │   ├── src
│       │   │   ├── index.ts
│       │   │   └── lib
│       │   │       ├── network-contract.ts
│       │   │       ├── shared-config.d.ts
│       │   │       ├── shared-config.js
│       │   │       ├── shared-config.js.map
│       │   │       └── shared-config.ts
│       │   ├── tsconfig.json
│       │   └── tsconfig.lib.json
│       ├── contracts
│       │   ├── README.md
│       │   ├── eslint.config.mjs
│       │   ├── jest.config.cts
│       │   ├── package.json
│       │   ├── project.json
│       │   ├── src
│       │   │   ├── index.ts
│       │   │   └── lib
│       │   │       ├── contracts.spec.ts
│       │   │       ├── contracts.ts
│       │   │       ├── financial-integration.ts
│       │   │       ├── fiscal-document.contract.ts
│       │   │       └── plugin.interface.ts
│       │   ├── tsconfig.json
│       │   ├── tsconfig.lib.json
│       │   └── tsconfig.spec.json
│       ├── proto
│       │   ├── package.json
│       │   ├── project.json
│       │   ├── src
│       │   │   ├── index.ts
│       │   │   └── lib
│       │   │       ├── api-access-gateway.proto
│       │   │       ├── authn-credential.proto
│       │   │       ├── authorization-policy.proto
│       │   │       ├── billing.proto
│       │   │       ├── catalog.proto
│       │   │       ├── identity-audit-ledger.proto
│       │   │       ├── identity-profile.proto
│       │   │       ├── identity.proto
│       │   │       ├── inventory.proto
│       │   │       ├── provisioning-federation.proto
│       │   │       ├── risk-adaptive-auth.proto
│       │   │       ├── session.proto
│       │   │       └── token.proto
│       │   └── tsconfig.lib.json
│       ├── types
│       │   ├── package.json
│       │   ├── project.json
│       │   ├── src
│       │   │   ├── index.ts
│       │   │   └── lib
│       │   │       ├── auth.ts
│       │   │       └── shared-types.ts
│       │   ├── tsconfig.json
│       │   └── tsconfig.lib.json
│       ├── ui
│       │   ├── README.md
│       │   ├── eslint.config.mjs
│       │   ├── package.json
│       │   ├── project.json
│       │   ├── src
│       │   │   ├── index.ts
│       │   │   ├── lib
│       │   │   │   ├── components
│       │   │   │   │   ├── audit-trail
│       │   │   │   │   │   ├── audit-trail.html
│       │   │   │   │   │   ├── audit-trail.scss
│       │   │   │   │   │   ├── audit-trail.spec.ts
│       │   │   │   │   │   └── audit-trail.ts
│       │   │   │   │   ├── button.component.html
│       │   │   │   │   ├── button.component.scss
│       │   │   │   │   ├── button.component.ts
│       │   │   │   │   ├── confirmation-modal
│       │   │   │   │   │   └── confirmation-modal.component.ts
│       │   │   │   │   ├── geo-mismatch-modal
│       │   │   │   │   │   ├── geo-mismatch-modal.component.html
│       │   │   │   │   │   ├── geo-mismatch-modal.component.scss
│       │   │   │   │   │   └── geo-mismatch-modal.component.ts
│       │   │   │   │   ├── global-search
│       │   │   │   │   │   ├── global-search.page.html
│       │   │   │   │   │   ├── global-search.page.scss
│       │   │   │   │   │   ├── global-search.page.spec.ts
│       │   │   │   │   │   └── global-search.page.ts
│       │   │   │   │   ├── impact-analysis-modal
│       │   │   │   │   │   ├── impact-analysis-modal.html
│       │   │   │   │   │   ├── impact-analysis-modal.scss
│       │   │   │   │   │   ├── impact-analysis-modal.spec.ts
│       │   │   │   │   │   └── impact-analysis-modal.ts
│       │   │   │   │   ├── input.component.html
│       │   │   │   │   ├── input.component.scss
│       │   │   │   │   ├── input.component.ts
│       │   │   │   │   ├── kpi-card
│       │   │   │   │   │   ├── kpi-card.html
│       │   │   │   │   │   ├── kpi-card.scss
│       │   │   │   │   │   ├── kpi-card.spec.ts
│       │   │   │   │   │   └── kpi-card.ts
│       │   │   │   │   ├── language-selector
│       │   │   │   │   │   ├── language-selector.html
│       │   │   │   │   │   ├── language-selector.scss
│       │   │   │   │   │   ├── language-selector.spec.ts
│       │   │   │   │   │   └── language-selector.ts
│       │   │   │   │   ├── live-preview
│       │   │   │   │   │   ├── live-preview.html
│       │   │   │   │   │   ├── live-preview.scss
│       │   │   │   │   │   ├── live-preview.spec.ts
│       │   │   │   │   │   └── live-preview.ts
│       │   │   │   │   ├── loader
│       │   │   │   │   │   ├── loader.component.scss
│       │   │   │   │   │   └── loader.component.ts
│       │   │   │   │   ├── main-layout
│       │   │   │   │   │   ├── main-layout.component.html
│       │   │   │   │   │   ├── main-layout.component.scss
│       │   │   │   │   │   └── main-layout.component.ts
│       │   │   │   │   ├── modal
│       │   │   │   │   │   ├── modal.component.html
│       │   │   │   │   │   ├── modal.component.scss
│       │   │   │   │   │   └── modal.component.ts
│       │   │   │   │   ├── otp
│       │   │   │   │   │   ├── otp.component.html
│       │   │   │   │   │   ├── otp.component.scss
│       │   │   │   │   │   └── otp.component.ts
│       │   │   │   │   ├── stat-card
│       │   │   │   │   │   ├── stat-card.html
│       │   │   │   │   │   ├── stat-card.scss
│       │   │   │   │   │   ├── stat-card.spec.ts
│       │   │   │   │   │   └── stat-card.ts
│       │   │   │   │   ├── theme-toggle
│       │   │   │   │   │   ├── theme-toggle.html
│       │   │   │   │   │   ├── theme-toggle.scss
│       │   │   │   │   │   ├── theme-toggle.spec.ts
│       │   │   │   │   │   └── theme-toggle.ts
│       │   │   │   │   └── ui
│       │   │   │   │       └── modal
│       │   │   │   │           ├── index.ts
│       │   │   │   │           ├── ui-modal.component.html
│       │   │   │   │           ├── ui-modal.component.scss
│       │   │   │   │           └── ui-modal.component.ts
│       │   │   │   ├── core
│       │   │   │   │   ├── api
│       │   │   │   │   │   ├── roles.service.ts
│       │   │   │   │   │   └── users.service.ts
│       │   │   │   │   ├── guards
│       │   │   │   │   │   ├── auth.guard.spec.ts
│       │   │   │   │   │   ├── auth.guard.ts
│       │   │   │   │   │   ├── language-init.guard.spec.ts
│       │   │   │   │   │   ├── language-init.guard.ts
│       │   │   │   │   │   ├── language-redirect.guard.spec.ts
│       │   │   │   │   │   ├── language-redirect.guard.ts
│       │   │   │   │   │   ├── permissions-guard.ts
│       │   │   │   │   │   └── public.guard.ts
│       │   │   │   │   ├── interceptors
│       │   │   │   │   │   └── auth.interceptor.ts
│       │   │   │   │   ├── models
│       │   │   │   │   │   ├── finance.ts
│       │   │   │   │   │   ├── fiscal-region.model.ts
│       │   │   │   │   │   └── user.ts
│       │   │   │   │   ├── services
│       │   │   │   │   │   ├── accounts-payable.ts
│       │   │   │   │   │   ├── auth-queue.service.spec.ts
│       │   │   │   │   │   ├── auth-queue.service.ts
│       │   │   │   │   │   ├── auth.spec.ts
│       │   │   │   │   │   ├── auth.ts
│       │   │   │   │   │   ├── billing.ts
│       │   │   │   │   │   ├── branding.ts
│       │   │   │   │   │   ├── country.service.ts
│       │   │   │   │   │   ├── customer-receipts.ts
│       │   │   │   │   │   ├── dashboard.ts
│       │   │   │   │   │   ├── error-handler.service.ts
│       │   │   │   │   │   ├── geo-location.service.ts
│       │   │   │   │   │   ├── idle.service.ts
│       │   │   │   │   │   ├── invoices.ts
│       │   │   │   │   │   ├── language.spec.ts
│       │   │   │   │   │   ├── language.ts
│       │   │   │   │   │   ├── notification.ts
│       │   │   │   │   │   ├── push-notification.service.spec.ts
│       │   │   │   │   │   ├── push-notification.service.ts
│       │   │   │   │   │   ├── search.service.ts
│       │   │   │   │   │   ├── secure-storage.service.ts
│       │   │   │   │   │   ├── session.service.ts
│       │   │   │   │   │   ├── theme.ts
│       │   │   │   │   │   ├── tree.ts
│       │   │   │   │   │   └── websocket.service.ts
│       │   │   │   │   └── tokens
│       │   │   │   │       ├── http-context.tokens.ts
│       │   │   │   │       └── recaptcha.tokens.ts
│       │   │   │   ├── directives
│       │   │   │   │   └── has-permission.directive.ts
│       │   │   │   ├── enums
│       │   │   │   │   ├── auth-status.enum.ts
│       │   │   │   │   └── user-status.enum.ts
│       │   │   │   ├── interceptors
│       │   │   │   │   └── error.interceptor.ts
│       │   │   │   ├── interfaces
│       │   │   │   │   ├── login-credentials.interface.ts
│       │   │   │   │   ├── register-payload.interface.ts
│       │   │   │   │   ├── user-payload.interface.ts
│       │   │   │   │   └── user.interface.ts
│       │   │   │   ├── models
│       │   │   │   │   ├── account-tree-node.model.ts
│       │   │   │   │   ├── flattened-account.model.ts
│       │   │   │   │   ├── gridster-compat.ts
│       │   │   │   │   ├── plan.model.ts
│       │   │   │   │   ├── tax.model.ts
│       │   │   │   │   └── user-dtos.ts
│       │   │   │   ├── pages
│       │   │   │   │   └── unauthorized
│       │   │   │   │       ├── unauthorized.page.html
│       │   │   │   │       ├── unauthorized.page.scss
│       │   │   │   │       └── unauthorized.page.ts
│       │   │   │   ├── services
│       │   │   │   │   ├── common
│       │   │   │   │   │   ├── config.service.ts
│       │   │   │   │   │   └── theme.service.ts
│       │   │   │   │   ├── loader.service.ts
│       │   │   │   │   ├── modal.interface.ts
│       │   │   │   │   ├── modal.service.ts
│       │   │   │   │   ├── organization.service.ts
│       │   │   │   │   └── toast.service.ts
│       │   │   │   ├── shared
│       │   │   │   │   └── service
│       │   │   │   │       └── modal.service.ts
│       │   │   │   ├── shared-ui
│       │   │   │   │   ├── shared-ui.css
│       │   │   │   │   ├── shared-ui.html
│       │   │   │   │   ├── shared-ui.spec.ts
│       │   │   │   │   └── shared-ui.ts
│       │   │   │   ├── styles
│       │   │   │   │   ├── _toast.scss
│       │   │   │   │   ├── _tokens.scss
│       │   │   │   │   └── migrated
│       │   │   │   │       ├── _base.scss
│       │   │   │   │       ├── _forms.scss
│       │   │   │   │       ├── _variables.scss
│       │   │   │   │       ├── _view-styles.scss
│       │   │   │   │       ├── theme-dark.scss
│       │   │   │   │       └── theme-light.scss
│       │   │   │   ├── utils
│       │   │   │   │   ├── file.util.ts
│       │   │   │   │   └── user-agent.util.ts
│       │   │   │   └── validators
│       │   │   │       ├── async.validators.ts
│       │   │   │       ├── password.validator.spec.ts
│       │   │   │       └── password.validator.ts
│       │   │   └── test-setup.ts
│       │   ├── tsconfig.json
│       │   ├── tsconfig.lib.json
│       │   ├── tsconfig.spec.json
│       │   └── vite.config.mts
│       ├── util
│       │   ├── auth
│       │   │   ├── project.json
│       │   │   ├── src
│       │   │   │   ├── index.ts
│       │   │   │   └── lib
│       │   │   │       ├── auth-util.ts
│       │   │   │       └── empty.ts
│       │   │   └── tsconfig.lib.json
│       │   ├── client
│       │   │   ├── auth
│       │   │   │   ├── README.md
│       │   │   │   ├── eslint.config.mjs
│       │   │   │   ├── package.json
│       │   │   │   ├── project.json
│       │   │   │   ├── src
│       │   │   │   │   ├── index.ts
│       │   │   │   │   └── test-setup.ts
│       │   │   │   ├── tsconfig.json
│       │   │   │   ├── tsconfig.lib.json
│       │   │   │   ├── tsconfig.spec.json
│       │   │   │   └── vite.config.mts
│       │   │   ├── config
│       │   │   │   ├── package.json
│       │   │   │   ├── project.json
│       │   │   │   ├── src
│       │   │   │   │   ├── index.ts
│       │   │   │   │   └── lib
│       │   │   │   │       ├── app.config.ts
│       │   │   │   │       └── tokens
│       │   │   │   │           └── api-url.token.ts
│       │   │   │   ├── tsconfig.json
│       │   │   │   ├── tsconfig.lib.json
│       │   │   │   ├── tsconfig.spec.json
│       │   │   │   └── vitest.config.ts
│       │   │   └── http
│       │   │       ├── package.json
│       │   │       ├── project.json
│       │   │       ├── src
│       │   │       │   ├── index.ts
│       │   │       │   ├── lib
│       │   │       │   │   ├── loading.interceptor.ts
│       │   │       │   │   ├── loading.service.ts
│       │   │       │   │   └── services
│       │   │       │   │       └── graphql-client.service.ts
│       │   │       │   └── test-setup.ts
│       │   │       ├── tsconfig.json
│       │   │       ├── tsconfig.lib.json
│       │   │       ├── tsconfig.spec.json
│       │   │       └── vitest.config.ts
│       │   └── server
│       │       ├── health
│       │       │   ├── package.json
│       │       │   ├── project.json
│       │       │   ├── src
│       │       │   │   ├── index.ts
│       │       │   │   └── lib
│       │       │   │       ├── health.controller.ts
│       │       │   │       └── health.module.ts
│       │       │   └── tsconfig.lib.json
│       │       └── server-config
│       │           ├── package.json
│       │           ├── project.json
│       │           ├── src
│       │           │   ├── index.ts
│       │           │   └── lib
│       │           │       ├── bootstrap.ts
│       │           │       ├── constants
│       │           │       │   └── countries.ts
│       │           │       ├── decorators
│       │           │       │   └── current-tenant.decorator.ts
│       │           │       ├── env.validation.ts
│       │           │       ├── exceptions
│       │           │       │   └── domain.exception.ts
│       │           │       ├── federation
│       │           │       │   ├── federation-support.module.ts
│       │           │       │   └── health.resolver.ts
│       │           │       ├── filters
│       │           │       │   ├── global-exception.filter.spec.ts
│       │           │       │   └── global-exception.filter.ts
│       │           │       ├── global-config.service.ts
│       │           │       ├── interceptors
│       │           │       │   └── idempotency.interceptor.ts
│       │           │       ├── server-config.module.ts
│       │           │       ├── services
│       │           │       │   ├── idempotency.service.ts
│       │           │       │   └── logger.service.ts
│       │           │       └── tracing.ts
│       │           ├── tsconfig.json
│       │           ├── tsconfig.lib.json
│       │           ├── tsconfig.spec.json
│       │           └── vitest.config.ts
│       └── validators
│           ├── README.md
│           ├── package.json
│           ├── project.json
│           ├── src
│           │   ├── index.ts
│           │   └── lib
│           │       ├── cpf.validator.ts
│           │       └── rfc.validator.ts
│           ├── tsconfig.json
│           └── tsconfig.lib.json
├── nx.json
├── package-lock.json
├── package.json
├── platform
│   ├── helm
│   │   └── virtex
│   │       ├── Chart.yaml
│   │       ├── templates
│   │       │   ├── all-apps.yaml
│   │       │   └── gateway-api.yaml
│   │       └── values.yaml
│   ├── infrastructure
│   │   ├── docker
│   │   │   ├── docker-compose.yml
│   │   │   ├── init-scripts
│   │   │   │   ├── 01-create-databases.sh
│   │   │   │   └── 010_tenant_rls_baseline.sql
│   │   │   ├── nginx
│   │   │   │   ├── certs
│   │   │   │   │   └── .gitkeep
│   │   │   │   └── nginx.conf
│   │   │   └── traefik
│   │   │       ├── dynamic.yml
│   │   │       └── traefik.yml
│   │   └── terraform
│   │       ├── main.tf
│   │       ├── modules
│   │       │   ├── eks
│   │       │   │   └── main.tf
│   │       │   ├── elasticache
│   │       │   │   └── main.tf
│   │       │   ├── msk
│   │       │   │   └── main.tf
│   │       │   ├── rds
│   │       │   │   └── main.tf
│   │       │   └── vpc
│   │       │       └── main.tf
│   │       └── regions
│   │           └── v1
│   │               ├── README.md
│   │               ├── main.tf
│   │               └── modules
│   │                   ├── compute
│   │                   │   └── main.tf
│   │                   ├── data
│   │                   │   └── main.tf
│   │                   ├── network
│   │                   │   └── main.tf
│   │                   ├── observability
│   │                   │   └── main.tf
│   │                   └── queues
│   │                       └── main.tf
│   ├── kubernetes
│   │   ├── manifests
│   │   │   └── base
│   │   │       ├── deployment.yaml
│   │   │       └── kustomization.yaml
│   │   └── templates
│   │       ├── deployment-template.yaml
│   │       └── service-template.yaml
│   ├── observability
│   │   ├── dashboards
│   │   │   └── tenant-readiness-5-0.json
│   │   ├── federation-slos.json
│   │   └── prometheus
│   │       └── prometheus.yml
│   └── policies
│       ├── compliance
│       │   └── fiscal.rego
│       └── security
│           ├── allowlist.rego
│           └── plugin_admission.rego
├── sbom.json
├── sbom.json.sig
├── skaffold.yaml
├── test-results
│   └── .last-run.json
├── tools
│   ├── dev-doctor.mjs
│   ├── diagnostic
│   │   ├── summarize_errors.mjs
│   │   └── test_serve.mjs
│   ├── dr
│   │   └── run-scheduled-drill.mjs
│   ├── enforce-production-readiness.sh
│   ├── fiscal
│   │   ├── smoke-test-fiscal.js
│   │   └── validate-certificate.js
│   ├── generate-project-map.sh
│   ├── generators
│   │   ├── api-app
│   │   │   ├── index.ts
│   │   │   └── schema.json
│   │   ├── ddd-resource
│   │   │   ├── files
│   │   │   │   ├── application
│   │   │   │   │   └── src
│   │   │   │   │       └── lib
│   │   │   │   │           └── __name__.service.ts.template
│   │   │   │   ├── domain
│   │   │   │   │   └── src
│   │   │   │   │       └── lib
│   │   │   │   │           └── __name__.entity.ts.template
│   │   │   │   ├── infrastructure
│   │   │   │   │   └── src
│   │   │   │   │       └── lib
│   │   │   │   │           └── __name__.repository.ts.template
│   │   │   │   └── presentation
│   │   │   │       └── src
│   │   │   │           └── lib
│   │   │   │               └── __name__.controller.ts.template
│   │   │   ├── index.ts
│   │   │   └── schema.json
│   │   ├── domain-lib
│   │   │   └── index.ts
│   │   ├── platform-shell
│   │   │   └── index.ts
│   │   └── web-app
│   │       └── index.ts
│   ├── k6
│   │   └── suite
│   │       ├── offline-sync-chaos.js
│   │       ├── plugin-security.js
│   │       └── rls-load-test.js
│   ├── opa
│   ├── quality-gates
│   │   ├── block-simulations.sh
│   │   ├── check-nx-registration.mjs
│   │   ├── check-rls.js
│   │   ├── check-terraform-drift.sh
│   │   ├── check-tls-hardening.js
│   │   ├── config
│   │   │   └── error-budget-policy.json
│   │   ├── report-governance-scorecard.mjs
│   │   ├── schema-diff.ts
│   │   ├── sign-supergraph.js
│   │   ├── track-deprecations.ts
│   │   ├── validate-docs-consistency.mjs
│   │   ├── validate-e2e-coverage.mjs
│   │   ├── validate-error-budget-policy.mjs
│   │   ├── validate-federation-contracts.ts
│   │   ├── validate-naming.mjs
│   │   ├── validate-operational-consistency.mjs
│   │   ├── validate-plugin-isolation.mjs
│   │   ├── validate-regional-topology.mjs
│   │   └── verify-rollback-evidence.mjs
│   ├── readiness
│   │   ├── generate-evidence-pack.mjs
│   │   ├── generate-infra-evidence-pack.mjs
│   │   ├── generate-release-report.mjs
│   │   ├── validate-commercial-readiness.mjs
│   │   ├── validate-dr-evidence.mjs
│   │   ├── validate-readiness-consistency.mjs
│   │   └── validate-signing-readiness.sh
│   ├── refactors
│   │   ├── archived-cleanup.py
│   │   ├── extract_inline_components.py
│   │   ├── fix-phantom-root-dir.py
│   │   ├── fix-tags.py
│   │   ├── fix_imports.py
│   │   ├── fix_self_references.py
│   │   ├── harden-eslint.py
│   │   ├── refactor_env.py
│   │   ├── refactor_paths.py
│   │   └── update_aliases.py
│   ├── replace_virtex_with_virtex.py
│   ├── run-pocs.sh
│   ├── scripts
│   │   └── generate-sbom.ts
│   ├── seed-tax-tables.ts
│   ├── validate-architecture-boundaries.mjs
│   ├── validate-backend-test-targets.mjs
│   ├── validate-policies.sh
│   ├── validate-project-tags.mjs
│   └── validate-structure.mjs
├── tsconfig.base.json
├── tsconfig.json
├── virtex_OVERVIEW.md
├── virtex_accounting
├── vitest.config.ts
└── vitest.workspace.ts

1720 directories, 4353 files
```
