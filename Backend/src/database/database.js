import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
import _ from 'lodash';
import { REPL_MODE_STRICT } from 'repl';


const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, '../../data/db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)


const connect = async () => {
    await db.read();
    db.data = db.data || {}
    db.data.devices || []
    db.data.users || []
    
}

const Devices = {
    next_id: () => {
        const id = Math.max(
            ...db.data.devices.map(d => d.id)
        );
        console.log(id)
        if(id == null || id <0) {
            return 0
        }
        return (id || 0) + 1;
    },

    all: () =>{
        //return all devices
        return db.data.devices;
    },

    onedevice: (val) =>{
        return db.data.devices.find(d => d.id == val);
    },

    list: () =>{
        var boom = db.data.devices
        return (_.pick(boom, ['id', 'name']))
    },

    create: (data, filename) => {
        const device = {
            id: Devices.next_id(),
            deviceid: data.deviceid,
            devicename: data.devicename,
            longitude: data.longitude,
            latitude: data.latitude,
            description: data.description,
            filename: filename
        };

        db.data.devices.push(device);

        return new Promise((resolve, reject) => {
            db.write()
            .then(() => resolve(device))
            .catch(() => reject({}))
        });
    }
}


const Users = {
    next_id: () => {
      const id = Math.max(...db.data.users.map(d => d.id))
      return (id > 0 ? id + 1 : 1);
    },
  
    create: (email, username , password, filename) => {
      const obj = { id: Users.next_id(), email: email,username: username, password: password, filename: filename };
      db.data.users.push(obj);
      return new Promise((resolve, reject) => {
        db.write()
        .then(() => resolve(obj))
        .catch(() => reject({}))
      })
    },
  
    find_by_email: (email) => {

      db.read()
      return db.data.users.find(d => d.email == email);
    },
  
    find_by_id: (id) => {
      db.read()  
      return db.data.users.find(d => d.id == id);
    }
  }

export {connect, Devices, Users}
