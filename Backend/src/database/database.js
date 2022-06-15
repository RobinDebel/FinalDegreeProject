import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
import _ from 'lodash';


const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, '../../data/db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)


const connect = async () => {
    await db.read();
    db.data = db.data || {}
    db.data.users || []
    
}

const Users = {
    // Providing an id to every new user
    next_id: () => {
      const id = Math.max(...db.data.users.map(d => d.id))
      return (id > 0 ? id + 1 : 1);
    },
  
    // Create a new user
    create: (email, username , password) => {
      const obj = { id: Users.next_id(), email: email,username: username, password: password};
      db.data.users.push(obj);
      return new Promise((resolve, reject) => {
        db.write()
        .then(() => resolve(obj))
        .catch(() => reject({}))
      })
    },
  
    // Get a user by email
    find_by_email: (email) => {
      db.read()
      return db.data.users.find(d => d.email == email);
    },
  
    // Get a user by id
    find_by_id: (id) => {
      db.read()  
      return db.data.users.find(d => d.id == id);
    }
  }

export {connect, Users}
