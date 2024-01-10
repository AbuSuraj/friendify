// import mysql from "mysql"

// export const db = mysql.createConnection({
//   host:"gateway01.ap-southeast-1.prod.aws.tidbcloud.com",
//   user:"aWLw16Hy7BmSsP3.root",
//   password:"yzbY5tYTX8oI1hcy",
//   database:"social",
//   CA: './isrgrootx1.pem'
// })
import mysql from "mysql2";

// Connection string
const connectionString = "mysql://aWLw16Hy7BmSsP3.root:yzbY5tYTX8oI1hcy@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/social?ssl={\"rejectUnauthorized\":true}";

// const connectionString = "mysql://aWLw16Hy7BmSsP3.root:yzbY5tYTX8oI1hcy@gateway01.ap-southeast-1.prod.aws.tidbcloud.com:4000/social";

// Create a connection pool
export const db = mysql.createPool(connectionString);