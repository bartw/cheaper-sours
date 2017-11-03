let loggers = [console];

const attach = logable => {
  loggers.push(logable);
  const index = loggers.length - 1;
  return () => { loggers = loggers.splice(index, 1);};
};

const log = message => {
  loggers.forEach(logable => {
    logable.log(message);
  });
};

const logger = {
  log: log,
  attach: attach,
};

module.exports = logger;
