const express = require("express");
const { Novu } = require("@novu/node");
const novu = new Novu("940f48d17795658342bb1506a4adf062");
const cors = require("cors");
const app = express();
const PORT = 4000;

const sqlite3 = require('sqlite3').verbose(); // SQLite3 call

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const threadList = [];

const generateID = () => Math.random().toString(36).substring(2, 10);

// SQLite part

// Create a new database or connect to an existing one
const user_db = new sqlite3.Database('mentalAngel_users.db', (err) => {
	if (err) {
	  console.error(err.message);
	} else {
	  console.log('Connected to the SQLite database.');
	}

	// SQL statement to create a 'users' table if it doesn't exist
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT,
        password TEXT,
        username TEXT
      )
    `;

    // Execute the SQL statement to create the 'users' table
    user_db.run(createUsersTable, (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log('Users table created successfully');
      }
    });

});

// Login part
app.post("/api/login", (req, res) => {
	const { email, password } = req.body;
	const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  
	user_db.get(sql, [email, password], (err, row) => {
	  if (err) {
		return res.status(500).json({ error_message: err.message });
	  }
  
	  if (!row) {
		return res.status(401).json({ error_message: "Incorrect credentials" });
	  }
  
	  res.json({
      message: "Login successfully",
      id: row.id, // Từ đây, biến id (id của user) được chuyển đến frontend để lưu trữ local trong trình duyệt
		// Other necessary data from the row
	  });
	});
});

// Register part
app.post("/api/register", (req, res) => {

	const { email, password, username } = req.body;
	
	const checkUserQuery = 'SELECT * FROM users WHERE email = ?'; // Email này đã được đăng ký chưa?
  
	// Check if the user already exists in the database
	user_db.get(checkUserQuery, [email], (err, existingUser) => {
	  if (err) {
		return res.status(500).json({ error_message: err.message });
	  }
  
	  if (existingUser) {
		return res.status(409).json({ error_message: "User already exists" });
	  }
  
	  const insertUserQuery = 'INSERT INTO users (email, password, username) VALUES (?, ?, ?)';
	  
	  // Insert the new user into the database
	  user_db.run(insertUserQuery, [email, password, username], (err) => {
		if (err) {
		  return res.status(500).json({ error_message: err.message });
		}
  
		return res.json({ message: "Account created successfully!" });
	  });
	});
});
  

//

// Chỉnh lại đống phía dưới, tại user mình lưu bằng SQLite

app.post("/api/create/thread", async (req, res) => {

  // Hiểu xem 2 biến thread, userId là gì từ request bên frontend, file Home.js :
  // body: JSON.stringify({
  //   thread,
  //   id: localStorage.getItem("_id"),
  // }),
  // Phía frontend trả về request dạng json bao gồm :
  // thread : thread, userId : chính là id (lấy từ key "_id" trong localStorage)
  // Vậy thì quá trình lấy user_Id đúng. Sao nó lại không chạy?
	const { thread, userId } = req.body;


	let threadId = generateID();
	threadList.unshift({
		id: threadId,
		title: thread,
		userId,
		replies: [],
		likes: [],
	});

	await novu.topics.create({
		key: threadId,
		name: thread,
	 });

	await novu.topics.addSubscribers(threadId, {
	 	subscribers: [userId],
	 	//replace with your subscriber ID to test run
		// subscribers: ["<YOUR_SUBSCRIBER_ID>"],
	 });

	res.json({
		message: "Thread created successfully!",
		threads: threadList,
	});
});

app.get("/api/all/threads", (req, res) => {
	res.json({
		threads: threadList,
	});
});

app.post("/api/thread/like", (req, res) => {
	const { threadId, userId } = req.body;
	const result = threadList.filter((thread) => thread.id === threadId);
	const threadLikes = result[0].likes;

	const authenticateReaction = threadLikes.filter((user) => user === userId);

	if (authenticateReaction.length === 0) {
		threadLikes.push(userId);
		return res.json({
			message: "You've reacted to the post!",
		});
	}
	res.json({
		error_message: "You can only react once!",
	});
});

app.post("/api/thread/replies", (req, res) => {
	const { id } = req.body;
	const result = threadList.filter((thread) => thread.id === id);
	res.json({
		replies: result[0].replies,
		title: result[0].title,
	});
});

app.post("/api/create/reply", async (req, res) => {
	const { id, userId, reply } = req.body;
	const result = threadList.filter((thread) => thread.id === id);

	// const username = users.filter((user) => user.id === userId); 
  	// Sửa lại dòng code trên modify theo việc dùng SQLite để lưu user_database
  	const query = `SELECT * FROM users WHERE id = ?`;
	let usernames = []; // Initialize an empty array to store usernames

	user_db.get(query, [userId], (err, row) => {
		if (err) {
		  return res.status(500).json({ error_message: err.message });
		}
	  
		if (row) {
			result[0].replies.unshift({ name: row.username, text: reply });

			res.json({
				message: "Response added successfully!",
			});
		} else {
		  console.log('User not found'); // Print a message indicating that the user with the given ID was not found
		}
	});
  //

  // Lỗi : cái mảng usernames ... không chứa cái gì cả tại thời điểm gọi, 
  // vậy nên gọi usernames[0] chẵc chắn bị lỗi.
	// result[0].replies.unshift({ name: usernames[0].username, text: reply });

	// await novu.trigger("topicnotification", {
	// to: [{ type: "Topic", topicKey: id }],
	// });

	// res.json({
	// 	message: "Response added successfully!",
	// });

});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});