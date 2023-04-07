const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/register', auth.register);
router.post('/login', auth.login);

module.exports = router;