# Clean reinstall – Next.js / full app

Run these in the project folder (e.g. `getstay-app-1.0`) in **PowerShell** or **Command Prompt**.

## 1. Remove install and cache

```powershell
cd "C:\Users\Pankaj\Desktop\getstay\getstay-app-1.0"

Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
Remove-Item -Force bun.lock -ErrorAction SilentlyContinue
```

## 2. Reinstall with Bun

```powershell
bun install
```

## 3. Build

```powershell
bun run build
```

---

## Optional: reinstall only Next.js

If you prefer to keep other deps and only reinstall Next (and its peers):

```powershell
bun remove next
bun add next@16.1.6
bun run build
```

---

**Note:** If you had a `package-lock.json` in this folder and mixed npm with Bun, that can cause odd behavior. This project uses Bun only; no need to add `package-lock.json` here.
