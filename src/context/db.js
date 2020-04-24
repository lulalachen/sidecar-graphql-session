import { Sequelize } from 'sequelize'

export default () => {
  const db = new Sequelize({
    dialect: 'sqlite',
    storage: './store.sqlite',
  })

  const users = db.define('user', {
    uuid: Sequelize.UUIDV4,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  })

  const bookmarks = db.define('bookmark', {
    uuid: Sequelize.UUIDV4,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    doctorUuid: Sequelize.STRING,
    userUuid: Sequelize.UUIDV4,
  })

  Promise.all([users.findOne(), bookmarks.findOne()])
    .then(() => {})
    .catch(() => {
      console.log('Initialize DB')
      db.sync({ force: true })
    })

  return { db, users, bookmarks }
}
