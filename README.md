# shopping-app (shopping-4)

A Quasar Framework app

## Install the dependencies

```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Build the app for production

```bash
quasar build
```

### Customize the configuration

See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

### Troubleshooting

If you encounter issues while running the app in development mode (`quasar dev`), consider the following steps:

1. **Check Dependencies**: Ensure all dependencies are installed by running:

   ```bash
   npm install
   ```

2. **Verify Quasar CLI Installation**: Ensure the Quasar CLI is installed globally:

   ```bash
   npm install -g @quasar/cli
   ```

   If you encounter a "permission denied" error, try using `sudo` (Linux/macOS) or running the command as an administrator (Windows):

   ```bash
   sudo npm install -g @quasar/cli
   ```

   Alternatively, you can configure npm to use a directory in your home folder for global installations:

   ```bash
   mkdir -p ~/.npm-global
   npm config set prefix '~/.npm-global'
   export PATH=~/.npm-global/bin:$PATH
   source ~/.bashrc # or ~/.zshrc, depending on your shell
   npm install -g @quasar/cli
   ```

3. **Inspect Error Logs**: Review the error message in the terminal for clues. Common issues include missing dependencies or misconfigured environment variables.

4. **Clear Cache**: Sometimes clearing the npm cache can resolve issues:

   ```bash
   npm cache clean --force
   ```

5. **Delete and Reinstall `node_modules`**:

   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

6. **Check Node.js Version**: Ensure you are using a compatible Node.js version. You can check your version with:

   ```bash
   node -v
   ```

7. **Environment Variables**: Ensure any required environment variables are properly set. Refer to the project's documentation for details.

8. **OpenSSL Error (`ERR_OSSL_EVP_UNSUPPORTED`)**: This error occurs with Node.js 17+ due to OpenSSL changes. You can resolve it by either:

   - **Option 1: Downgrade Node.js**: Use Node.js 16 (LTS) or an earlier compatible version. If you don't have `nvm` (Node Version Manager) installed, you can install it with:

     ```bash
     curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
     source ~/.bashrc # or ~/.zshrc, depending on your shell
     ```

     After installing `nvm`, you can install and use Node.js 16:

     ```bash
     nvm install 16
     nvm use 16
     ```

   - **Option 2: Set Legacy OpenSSL Behavior**: Add the following environment variable before running `quasar dev`:
     ```bash
     export NODE_OPTIONS=--openssl-legacy-provider
     quasar dev
     ```

If the issue persists, provide the error details for further assistance.
