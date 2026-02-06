interface Env {
  ENV: string;
  APP_NAME: string;
  APP_KV: KVNamespace;
  VERSION?: string;
  GIT_SHA?: string;
}

