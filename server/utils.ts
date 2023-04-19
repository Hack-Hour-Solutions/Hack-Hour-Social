interface createErr {
  method: string;
  type: string;
  err: Error;
  status?: number;
}

export const createErr = ({ method, type, err, status }: createErr) => ({
  log: `${method}, ${type}: ${
    typeof err === 'object' ? JSON.stringify(err, ['name', 'message'], 2) : err
  }`,
  status: status ? status : 500,
  message: {
    err: `Error occurred in ${method}. check server logs for more details`,
  },
});
