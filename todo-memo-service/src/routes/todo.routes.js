const express = require("express");
const router = express.Router();

const TodoController = require("../controllers/todo.controller");
const authenticateToken = require("../middleware/auth.middleware");

router.post("/",authenticateToken,TodoController.createTodo);

router.get("/",authenticateToken,TodoController.getTodos);

router.put("/:id",authenticateToken,TodoController.updateTodo);

router.delete("/:id",authenticateToken,TodoController.deleteTodo);

module.exports = router;

const validate = require("../middleware/validate.middleware");
const { createTodoSchema, updateTodoSchema } =
require("../validators/todo.validator");

router.post(
  "/",
  authenticateToken,
  validate(createTodoSchema),
  TodoController.createTodo
);

router.put(
  "/:id",
  authenticateToken,
  validate(updateTodoSchema),
  TodoController.updateTodo
);