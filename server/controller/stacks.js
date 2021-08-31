const { Stack } = require('../models');
const db = require('../models');

module.exports = {
  getAllStacks: async (req, res) => {
    const stacks = await Stack.findAll({ attributes: ['name'], raw: true });
    const stackWithArray = stacks.map((stack) => stack.name);
    try {
      if (stackWithArray) {
        return res.status(200).json({ data: stackWithArray, message: 'ok' });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Server Error' });
    }
  },
};
