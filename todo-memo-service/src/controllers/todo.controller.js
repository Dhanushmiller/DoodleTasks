const db = require("../config/db");

class TodoController {

  // CREATE TODO
  static createTodo(req, res) {

  const { task_name, expiry } = req.body;
  const userId = req.user.id;

  const query =
  "INSERT INTO todos (user_id, task_name, expiry) VALUES (?, ?, ?)";

  db.query(query, [userId, task_name, expiry], (err, result) => {

    if (err) {
      return res.status(500).json({
        success: false,
        message: "Database error"
      });
    }

    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      todoId: result.insertId
    });

  });
}

  // GET ALL TODOS OF USER
  static getTodos(req, res) {

    const userId = req.user.id;

    const query =
      "SELECT * FROM todos WHERE user_id=? AND is_deleted=false ORDER BY created_at DESC";

    db.query(query, [userId], (err, results) => {

      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.json(results);

    });
  }

  // UPDATE TODO
  static updateTodo(req, res) {

    const todoId = req.params.id;
    const userId = req.user.id;

    const { task_name, completion_status, expiry } = req.body;

    const query =
      "UPDATE todos SET task_name=?, completion_status=?, expiry=? WHERE id=? AND user_id=?";

    db.query(
      query,
      [task_name, completion_status, expiry, todoId, userId],
      (err, result) => {

        if (err) {
          return res.status(500).json({ error: err.message });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "Todo not found" });
        }

        res.json({ message: "Todo updated successfully" });

      }
    );
  }

  // DELETE TODO (SOFT DELETE)
  static deleteTodo(req, res) {

    const todoId = req.params.id;
    const userId = req.user.id;

    const query =
      "UPDATE todos SET is_deleted=true WHERE id=? AND user_id=?";

    db.query(query, [todoId, userId], (err, result) => {

      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Todo not found" });
      }

      res.json({ message: "Todo moved to trash" });

    });
  }

  static getTrashTodos(req,res){

 const userId = req.user.id;

 const query =
 "SELECT * FROM todos WHERE user_id=? AND is_deleted=true";

 db.query(query,[userId],(err,results)=>{

   if(err){
     return res.status(500).json({
       success:false,
       message:"Database error"
     });
   }

   res.status(200).json({
     success:true,
     data:results
   });

 });

}

static restoreTodo(req,res){

 const todoId = req.params.id;
 const userId = req.user.id;

 const query =
 "UPDATE todos SET is_deleted=false WHERE id=? AND user_id=?";

 db.query(query,[todoId,userId],(err,result)=>{

   if(err){
     return res.status(500).json({
       success:false,
       message:"Database error"
     });
   }

   res.status(200).json({
     success:true,
     message:"Todo restored successfully"
   });

 });

}

static deletePermanent(req,res){

 const todoId = req.params.id;
 const userId = req.user.id;

 const query =
 "DELETE FROM todos WHERE id=? AND user_id=?";

 db.query(query,[todoId,userId],(err,result)=>{

   if(err){
     return res.status(500).json({
       success:false,
       message:"Database error"
     });
   }

   res.status(200).json({
     success:true,
     message:"Todo permanently deleted"
   });

 });

}

}

module.exports = TodoController;