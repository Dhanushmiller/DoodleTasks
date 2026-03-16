const express = require("express");
const router = express.Router();

const TodoController = require("../controllers/todo.controller");
const authenticateToken = require("../middleware/auth.middleware");

router.get("/", authenticateToken, TodoController.getTodos);

router.put("/:id", authenticateToken, TodoController.updateTodo);

router.delete("/:id", authenticateToken, TodoController.deleteTodo);

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

router.get(
  "/trash",
  authenticateToken,
  TodoController.getTrashTodos
);

router.put(
  "/restore/:id",
  authenticateToken,
  TodoController.restoreTodo
);

router.delete(
  "/permanent/:id",
  authenticateToken,
  TodoController.deletePermanent
);

router.get(
 "/expired",
 authenticateToken,
 TodoController.getExpiredTodos
);