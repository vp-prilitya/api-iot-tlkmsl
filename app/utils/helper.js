const Helper = {
  getPagination(page, size) {
    const limit = size ? +size : null;
    if (limit) {
      const offset = page ? page * limit : 0;
      return { limit, offset };
    } else {
      const offset = 0;
      return { limit, offset };
    }
  },
};

module.exports = Helper;
