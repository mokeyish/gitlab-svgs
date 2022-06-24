const fileExtensionIcons = {
  html: 'html',
  htm: 'html',
  html_vm: 'html',
  asp: 'html',
  jade: 'pug',
  pug: 'pug',
  md: 'markdown',
  markdown: 'markdown',
  mdown: 'markdown',
  mkd: 'markdown',
  mkdn: 'markdown',
  rst: 'markdown',
  blink: 'blink',
  css: 'css',
  scss: 'sass',
  sass: 'sass',
  less: 'less',
  json: 'json',
  yaml: 'yaml',
  yml: 'yaml',
  xml: 'xml',
  plist: 'xml',
  xsd: 'xml',
  dtd: 'xml',
  xsl: 'xml',
  xslt: 'xml',
  resx: 'xml',
  iml: 'xml',
  xquery: 'xml',
  tmLanguage: 'xml',
  manifest: 'xml',
  project: 'xml',
  png: 'image',
  jpeg: 'image',
  jpg: 'image',
  gif: 'image',
  svg: 'image',
  ico: 'image',
  tif: 'image',
  tiff: 'image',
  psd: 'image',
  psb: 'image',
  ami: 'image',
  apx: 'image',
  bmp: 'image',
  bpg: 'image',
  brk: 'image',
  cur: 'image',
  dds: 'image',
  dng: 'image',
  exr: 'image',
  fpx: 'image',
  gbr: 'image',
  img: 'image',
  jbig2: 'image',
  jb2: 'image',
  jng: 'image',
  jxr: 'image',
  pbm: 'image',
  pgf: 'image',
  pic: 'image',
  raw: 'image',
  webp: 'image',
  js: 'javascript',
  ejs: 'javascript',
  esx: 'javascript',
  jsx: 'react',
  tsx: 'react',
  ini: 'settings',
  dlc: 'settings',
  dll: 'settings',
  config: 'settings',
  conf: 'settings',
  properties: 'settings',
  prop: 'settings',
  settings: 'settings',
  option: 'settings',
  props: 'settings',
  toml: 'settings',
  prefs: 'settings',
  ts: 'typescript',
  marko: 'markojs',
  pdf: 'pdf',
  xlsx: 'table',
  xls: 'table',
  ods: 'table',
  csv: 'table',
  tsv: 'table',
  vscodeignore: 'vscode',
  vsixmanifest: 'vscode',
  vsix: 'vscode',
  suo: 'visualstudio',
  sln: 'visualstudio',
  csproj: 'visualstudio',
  vb: 'visualstudio',
  pdb: 'database',
  sql: 'database',
  pks: 'database',
  pkb: 'database',
  accdb: 'database',
  mdb: 'database',
  sqlite: 'database',
  cs: 'csharp',
  zip: 'zip',
  tar: 'zip',
  gz: 'zip',
  xz: 'zip',
  bzip2: 'zip',
  gzip: 'zip',
  rar: 'zip',
  tgz: 'zip',
  exe: 'exe',
  msi: 'exe',
  java: 'java',
  jar: 'java',
  jsp: 'java',
  c: 'c',
  m: 'c',
  h: 'h',
  cc: 'cpp',
  cpp: 'cpp',
  mm: 'cpp',
  cxx: 'cpp',
  hpp: 'hpp',
  go: 'go',
  py: 'python',
  url: 'url',
  sh: 'console',
  ksh: 'console',
  csh: 'console',
  tcsh: 'console',
  zsh: 'console',
  bash: 'console',
  bat: 'console',
  cmd: 'console',
  ps1: 'powershell',
  psm1: 'powershell',
  psd1: 'powershell',
  ps1xml: 'powershell',
  psc1: 'powershell',
  pssc: 'powershell',
  gradle: 'gradle',
  doc: 'word',
  docx: 'word',
  odt: 'word',
  rtf: 'word',
  cer: 'certificate',
  cert: 'certificate',
  crt: 'certificate',
  pub: 'key',
  key: 'key',
  pem: 'key',
  asc: 'key',
  gpg: 'key',
  woff: 'font',
  woff2: 'font',
  ttf: 'font',
  eot: 'font',
  suit: 'font',
  otf: 'font',
  bmap: 'font',
  fnt: 'font',
  odttf: 'font',
  ttc: 'font',
  font: 'font',
  fonts: 'font',
  sui: 'font',
  ntf: 'font',
  mrf: 'font',
  lib: 'lib',
  bib: 'lib',
  rb: 'ruby',
  erb: 'ruby',
  fs: 'fsharp',
  fsx: 'fsharp',
  fsi: 'fsharp',
  fsproj: 'fsharp',
  swift: 'swift',
  ino: 'arduino',
  dockerignore: 'docker',
  dockerfile: 'docker',
  tex: 'tex',
  cls: 'tex',
  sty: 'tex',
  pptx: 'powerpoint',
  ppt: 'powerpoint',
  pptm: 'powerpoint',
  potx: 'powerpoint',
  pot: 'powerpoint',
  potm: 'powerpoint',
  ppsx: 'powerpoint',
  ppsm: 'powerpoint',
  pps: 'powerpoint',
  ppam: 'powerpoint',
  ppa: 'powerpoint',
  odp: 'powerpoint',
  webm: 'video',
  mkv: 'video',
  flv: 'video',
  vob: 'video',
  ogv: 'video',
  ogg: 'audio',
  gifv: 'video',
  avi: 'video',
  mov: 'video',
  qt: 'video',
  wmv: 'video',
  yuv: 'video',
  rm: 'video',
  rmvb: 'video',
  mp4: 'video',
  m4v: 'video',
  mpg: 'video',
  mp2: 'video',
  mpeg: 'video',
  mpe: 'video',
  mpv: 'video',
  m2v: 'video',
  vdi: 'virtual',
  vbox: 'virtual',
  ics: 'email',
  mp3: 'audio',
  flac: 'audio',
  m4a: 'audio',
  wma: 'audio',
  aiff: 'audio',
  coffee: 'coffee',
  txt: 'document',
  graphql: 'graphql',
  rs: 'rust',
  raml: 'raml',
  xaml: 'xaml',
  hs: 'haskell',
  kt: 'kotlin',
  kts: 'kotlin',
  patch: 'git',
  lua: 'lua',
  clj: 'clojure',
  cljs: 'clojure',
  groovy: 'groovy',
  r: 'r',
  rmd: 'r',
  dart: 'dart',
  as: 'actionscript',
  mxml: 'mxml',
  ahk: 'autohotkey',
  swf: 'flash',
  swc: 'swc',
  cmake: 'cmake',
  asm: 'assembly',
  a51: 'assembly',
  inc: 'assembly',
  nasm: 'assembly',
  s: 'assembly',
  ms: 'assembly',
  agc: 'assembly',
  ags: 'assembly',
  aea: 'assembly',
  argus: 'assembly',
  mitigus: 'assembly',
  binsource: 'assembly',
  vue: 'vue',
  ml: 'ocaml',
  mli: 'ocaml',
  cmx: 'ocaml',
  lock: 'lock',
  hbs: 'handlebars',
  mustache: 'handlebars',
  pl: 'perl',
  pm: 'perl',
  hx: 'haxe',
  pp: 'puppet',
  ex: 'elixir',
  exs: 'elixir',
  ls: 'livescript',
  erl: 'erlang',
  twig: 'twig',
  jl: 'julia',
  elm: 'elm',
  pure: 'purescript',
  tpl: 'smarty',
  styl: 'stylus',
  re: 'reason',
  rei: 'reason',
  cmj: 'bucklescript',
  merlin: 'merlin',
  v: 'verilog',
  vhd: 'verilog',
  sv: 'verilog',
  svh: 'verilog',
  nb: 'mathematica',
  wl: 'wolframlanguage',
  wls: 'wolframlanguage',
  njk: 'nunjucks',
  nunjucks: 'nunjucks',
  robot: 'robot',
  sol: 'solidity',
  au3: 'autoit',
  haml: 'haml',
  yang: 'yang',
  tf: 'terraform',
  tfvars: 'terraform',
  tfstate: 'terraform',
  applescript: 'applescript',
  cake: 'cake',
  feature: 'cucumber',
  nim: 'nim',
  nimble: 'nim',
  apib: 'apiblueprint',
  apiblueprint: 'apiblueprint',
  tag: 'riot',
  vfl: 'vfl',
  kl: 'kl',
  pcss: 'postcss',
  sss: 'postcss',
  todo: 'todo',
  cfml: 'coldfusion',
  cfc: 'coldfusion',
  lucee: 'coldfusion',
  cabal: 'cabal',
  nix: 'nix',
  slim: 'slim',
  http: 'http',
  rest: 'http',
  rql: 'restql',
  restql: 'restql',
  kv: 'kivy',
  graphcool: 'graphcool',
  sbt: 'sbt',
  cr: 'crystal',
  cu: 'cuda',
  cuh: 'cuda',
  log: 'log',
};

const twoFileExtensionIcons = {
  'gradle.kts': 'gradle',
  'md.rendered': 'markdown',
  'markdown.rendered': 'markdown',
  'mdown.rendered': 'markdown',
  'mkd.rendered': 'markdown',
  'mkdn.rendered': 'markdown',
  'YAML-tmLanguage': 'yaml',
  'sln.dotsettings': 'settings',
  'sln.dotsettings.user': 'settings',
  'd.ts': 'typescript-def',
  'code-workplace': 'vscode',
  '7z': 'zip',
  'c++': 'cpp',
  'vbox-prev': 'virtual',
  'js.map': 'javascript-map',
  'css.map': 'css-map',
  'spec.ts': 'test-ts',
  'test.ts': 'test-ts',
  'ts.snap': 'test-ts',
  'spec.tsx': 'test-jsx',
  'test.tsx': 'test-jsx',
  'tsx.snap': 'test-jsx',
  'spec.jsx': 'test-jsx',
  'test.jsx': 'test-jsx',
  'jsx.snap': 'test-jsx',
  'spec.js': 'test-js',
  'test.js': 'test-js',
  'js.snap': 'test-js',
  // 'routing.ts': 'angular-routing',
  // 'routing.js': 'angular-routing',
  'module.ts': 'angular',
  'module.js': 'angular',
  'ng-template': 'angular',
  'component.ts': 'angular-component',
  'component.js': 'angular-component',
  'guard.ts': 'angular-guard',
  'guard.js': 'angular-guard',
  'service.ts': 'angular-service',
  'service.js': 'angular-service',
  'pipe.ts': 'angular-pipe',
  'pipe.js': 'angular-pipe',
  'filter.js': 'angular-pipe',
  'directive.ts': 'angular-directive',
  'directive.js': 'angular-directive',
  'resolver.ts': 'angular-resolver',
  'resolver.js': 'angular-resolver',
  'tf.json': 'terraform',
  'blade.php': 'laravel',
  'inky.php': 'laravel',
  'reducer.ts': 'ngrx-reducer',
  'rootReducer.ts': 'ngrx-reducer',
  'state.ts': 'ngrx-state',
  'actions.ts': 'ngrx-actions',
  'effects.ts': 'ngrx-effects',
  'drone.yml': 'drone',
};

const fileNameIcons = {
  '.jscsrc': 'json',
  '.jshintrc': 'json',
  'tsconfig.json': 'json',
  'tslint.json': 'json',
  'composer.lock': 'json',
  '.jsbeautifyrc': 'json',
  '.esformatter': 'json',
  'cdp.pid': 'json',
  '.htaccess': 'xml',
  '.jshintignore': 'settings',
  '.buildignore': 'settings',
  makefile: 'settings',
  '.mrconfig': 'settings',
  '.yardopts': 'settings',
  'gradle.properties': 'gradle',
  gradlew: 'gradle',
  'gradle-wrapper.properties': 'gradle',
  COPYING: 'certificate',
  'COPYING.LESSER': 'certificate',
  LICENSE: 'certificate',
  LICENCE: 'certificate',
  'LICENSE.md': 'certificate',
  'LICENCE.md': 'certificate',
  'LICENSE.txt': 'certificate',
  'LICENCE.txt': 'certificate',
  '.gitlab-license': 'certificate',
  dockerfile: 'docker',
  'docker-compose.yml': 'docker',
  '.mailmap': 'email',
  '.gitignore': 'git',
  '.gitconfig': 'git',
  '.gitattributes': 'git',
  '.gitmodules': 'git',
  '.gitkeep': 'git',
  'git-history': 'git',
  '.Rhistory': 'r',
  'cmakelists.txt': 'cmake',
  'cmakecache.txt': 'cmake',
  'angular-cli.json': 'angular',
  '.angular-cli.json': 'angular',
  '.vfl': 'vfl',
  '.kl': 'kl',
  'postcss.config.js': 'postcss',
  '.postcssrc.js': 'postcss',
  'project.graphcool': 'graphcool',
  'webpack.js': 'webpack',
  'webpack.ts': 'webpack',
  'webpack.base.js': 'webpack',
  'webpack.base.ts': 'webpack',
  'webpack.config.js': 'webpack',
  'webpack.config.ts': 'webpack',
  'webpack.common.js': 'webpack',
  'webpack.common.ts': 'webpack',
  'webpack.config.common.js': 'webpack',
  'webpack.config.common.ts': 'webpack',
  'webpack.config.common.babel.js': 'webpack',
  'webpack.config.common.babel.ts': 'webpack',
  'webpack.dev.js': 'webpack',
  'webpack.dev.ts': 'webpack',
  'webpack.config.dev.js': 'webpack',
  'webpack.config.dev.ts': 'webpack',
  'webpack.config.dev.babel.js': 'webpack',
  'webpack.config.dev.babel.ts': 'webpack',
  'webpack.prod.js': 'webpack',
  'webpack.prod.ts': 'webpack',
  'webpack.server.js': 'webpack',
  'webpack.server.ts': 'webpack',
  'webpack.client.js': 'webpack',
  'webpack.client.ts': 'webpack',
  'webpack.config.server.js': 'webpack',
  'webpack.config.server.ts': 'webpack',
  'webpack.config.client.js': 'webpack',
  'webpack.config.client.ts': 'webpack',
  'webpack.config.production.babel.js': 'webpack',
  'webpack.config.production.babel.ts': 'webpack',
  'webpack.config.prod.babel.js': 'webpack',
  'webpack.config.prod.babel.ts': 'webpack',
  'webpack.config.prod.js': 'webpack',
  'webpack.config.prod.ts': 'webpack',
  'webpack.config.production.js': 'webpack',
  'webpack.config.production.ts': 'webpack',
  'webpack.config.staging.js': 'webpack',
  'webpack.config.staging.ts': 'webpack',
  'webpack.config.babel.js': 'webpack',
  'webpack.config.babel.ts': 'webpack',
  'webpack.config.base.babel.js': 'webpack',
  'webpack.config.base.babel.ts': 'webpack',
  'webpack.config.base.js': 'webpack',
  'webpack.config.base.ts': 'webpack',
  'webpack.config.staging.babel.js': 'webpack',
  'webpack.config.staging.babel.ts': 'webpack',
  'webpack.config.coffee': 'webpack',
  'webpack.config.test.js': 'webpack',
  'webpack.config.test.ts': 'webpack',
  'webpack.config.vendor.js': 'webpack',
  'webpack.config.vendor.ts': 'webpack',
  'webpack.config.vendor.production.js': 'webpack',
  'webpack.config.vendor.production.ts': 'webpack',
  'webpack.test.js': 'webpack',
  'webpack.test.ts': 'webpack',
  'webpack.dist.js': 'webpack',
  'webpack.dist.ts': 'webpack',
  'webpackfile.js': 'webpack',
  'webpackfile.ts': 'webpack',
  'ionic.config.json': 'ionic',
  '.io-config.json': 'ionic',
  'gulpfile.js': 'gulp',
  'gulpfile.ts': 'gulp',
  'gulpfile.babel.js': 'gulp',
  'package.json': 'nodejs',
  'package-lock.json': 'nodejs',
  '.nvmrc': 'nodejs',
  '.npmignore': 'npm',
  '.npmrc': 'npm',
  '.yarnrc': 'yarn',
  '.yarnrc.yml': 'yarn',
  'yarn.lock': 'yarn',
  '.yarnclean': 'yarn',
  '.yarn-integrity': 'yarn',
  'yarn-error.log': 'yarn',
  'androidmanifest.xml': 'android',
  '.env': 'tune',
  '.env.example': 'tune',
  '.babelrc': 'babel',
  'contributing.md': 'contributing',
  'contributing.md.rendered': 'contributing',
  'readme.md': 'readme',
  'readme.md.rendered': 'readme',
  changelog: 'changelog',
  'changelog.md': 'changelog',
  'changelog.md.rendered': 'changelog',
  CREDITS: 'credits',
  'credits.txt': 'credits',
  'credits.md': 'credits',
  'credits.md.rendered': 'credits',
  '.flowconfig': 'flow',
  'favicon.png': 'favicon',
  'karma.conf.js': 'karma',
  'karma.conf.ts': 'karma',
  'karma.conf.coffee': 'karma',
  'karma.config.js': 'karma',
  'karma.config.ts': 'karma',
  'karma-main.js': 'karma',
  'karma-main.ts': 'karma',
  '.bithoundrc': 'bithound',
  'appveyor.yml': 'appveyor',
  '.travis.yml': 'travis',
  'protractor.conf.js': 'protractor',
  'protractor.conf.ts': 'protractor',
  'protractor.conf.coffee': 'protractor',
  'protractor.config.js': 'protractor',
  'protractor.config.ts': 'protractor',
  'fuse.js': 'fusebox',
  procfile: 'heroku',
  '.editorconfig': 'editorconfig',
  '.gitlab-ci.yml': 'gitlab',
  '.bowerrc': 'bower',
  'bower.json': 'bower',
  '.eslintrc.js': 'eslint',
  '.eslintrc.yaml': 'eslint',
  '.eslintrc.yml': 'eslint',
  '.eslintrc.json': 'eslint',
  '.eslintrc': 'eslint',
  '.eslintignore': 'eslint',
  'code_of_conduct.md': 'conduct',
  'code_of_conduct.md.rendered': 'conduct',
  '.watchmanconfig': 'watchman',
  'aurelia.json': 'aurelia',
  'mocha.opts': 'mocha',
  jenkinsfile: 'jenkins',
  'firebase.json': 'firebase',
  '.firebaserc': 'firebase',
  Rakefile: 'ruby',
  'rollup.config.js': 'rollup',
  'rollup.config.ts': 'rollup',
  'rollup-config.js': 'rollup',
  'rollup-config.ts': 'rollup',
  'rollup.config.prod.js': 'rollup',
  'rollup.config.prod.ts': 'rollup',
  'rollup.config.dev.js': 'rollup',
  'rollup.config.dev.ts': 'rollup',
  'rollup.config.prod.vendor.js': 'rollup',
  'rollup.config.prod.vendor.ts': 'rollup',
  '.hhconfig': 'hack',
  '.stylelintrc': 'stylelint',
  'stylelint.config.js': 'stylelint',
  '.stylelintrc.json': 'stylelint',
  '.stylelintrc.yaml': 'stylelint',
  '.stylelintrc.yml': 'stylelint',
  '.stylelintrc.js': 'stylelint',
  '.stylelintignore': 'stylelint',
  '.codeclimate.yml': 'code-climate',
  '.prettierrc': 'prettier',
  'prettier.config.js': 'prettier',
  '.prettierrc.js': 'prettier',
  '.prettierrc.json': 'prettier',
  '.prettierrc.yaml': 'prettier',
  '.prettierrc.yml': 'prettier',
  '.prettierignore': 'prettier',
  'nodemon.json': 'nodemon',
  // '.sonarrc': 'sonar',
  browserslist: 'browserlist',
  '.browserslistrc': 'browserlist',
  '.snyk': 'snyk',
  '.drone.yml': 'drone',
};

function getIconForFile(name) {
  return (
    fileNameIcons[name] ||
    twoFileExtensionIcons[name ? name.split('.').slice(-2).join('.') : ''] ||
    fileExtensionIcons[name ? name.split('.').pop().toLowerCase() : ''] ||
    ''
  );
}

module.exports = {
  fileNameIcons,
  fileExtensionIcons,
  twoFileExtensionIcons,
  getIconForFile,
};
