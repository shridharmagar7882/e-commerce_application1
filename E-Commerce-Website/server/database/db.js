const Database = require('better-sqlite3')
const path = require('path')
const fs = require('fs')

// For now, store the DB file inside the project (we'll move this to
// app.getPath('userData') later once we wire this into Electron)
const dbPath = path.join(__dirname, 'nexus_store.db')
const dbExists = fs.existsSync(dbPath)

const db = new Database(dbPath)
db.pragma('foreign_keys = ON')

if (!dbExists) {
  const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8')
  db.exec(schema)
  console.log('Database initialized at', dbPath)
}

module.exports = db