const Todo = require("../models/todo.model");
const { Op } = require("sequelize");

class TodoController {

  static async createTodo(req, res) {

  try {

    const { task_name, expiry } = req.body;
    const userId = req.user.id;

    const expiryTime = new Date(expiry);
    const now = new Date();

    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

    // Check expiry validation
    if (expiryTime < oneHourLater) {
      return res.status(400).json({
        success: false,
        message: "Expiry time must be at least 1 hour from now"
      });
    }

    const todo = await Todo.create({
      user_id: userId,
      task_name,
      expiry
    });

    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: todo
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Database error"
    });

  }

}

  static async getTodos(req, res) {

    try {

      const userId = req.user.id;

      const todos = await Todo.findAll({
        where: {
          user_id: userId,
          is_deleted: false
        },
        order: [["created_at", "DESC"]]
      });

      res.json(todos);

    } catch (error) {

      res.status(500).json({ message: "Database error" });

    }

  }

  static async updateTodo(req, res) {

    try {

      const todoId = req.params.id;
      const userId = req.user.id;

      const { task_name, completion_status, expiry } = req.body;

      const updated = await Todo.update(
        { task_name, completion_status, expiry },
        {
          where: {
            id: todoId,
            user_id: userId
          }
        }
      );

      if (!updated[0]) {
        return res.status(404).json({ message: "Todo not found" });
      }

      res.json({ message: "Todo updated successfully" });

    } catch (error) {

      res.status(500).json({ message: "Database error" });

    }

  }

  static async getExpiredTodos(req, res) {

    try {

      const userId = req.user.id;

      const todos = await Todo.findAll({
        where: {
          user_id: userId,
          expiry: { [Op.lt]: new Date() },
          is_deleted: false
        }
      });

      res.json({
        success: true,
        data: todos
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: "Database error"
      });

    }

  }

  static async deleteTodo(req, res) {

    try {

      const todoId = req.params.id;
      const userId = req.user.id;

      const updated = await Todo.update(
        { is_deleted: true },
        {
          where: {
            id: todoId,
            user_id: userId
          }
        }
      );

      if (!updated[0]) {
        return res.status(404).json({ message: "Todo not found" });
      }

      res.json({ message: "Todo moved to trash" });

    } catch (error) {

      res.status(500).json({ message: "Database error" });

    }

  }

  static async getTrashTodos(req, res) {

    try {

      const userId = req.user.id;

      const todos = await Todo.findAll({
        where: {
          user_id: userId,
          is_deleted: true
        }
      });

      res.json({
        success: true,
        data: todos
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: "Database error"
      });

    }

  }

  static async restoreTodo(req, res) {

    try {

      const todoId = req.params.id;
      const userId = req.user.id;

      await Todo.update(
        { is_deleted: false },
        {
          where: {
            id: todoId,
            user_id: userId
          }
        }
      );

      res.json({
        success: true,
        message: "Todo restored successfully"
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: "Database error"
      });

    }

  }

  static async deletePermanent(req, res) {

    try {

      const todoId = req.params.id;
      const userId = req.user.id;

      await Todo.destroy({
        where: {
          id: todoId,
          user_id: userId
        }
      });

      res.json({
        success: true,
        message: "Todo permanently deleted"
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: "Database error"
      });

    }

  }

}

module.exports = TodoController;