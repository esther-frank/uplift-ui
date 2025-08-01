import { Link } from 'react-router-dom'
import styles from './Navbar.module.scss'
import Uplift1 from '../../Assests/UpLift1.svg'
import * as bootstrap from 'react-bootstrap'

interface NavbarProps {
  showItems: boolean
}
const Navbar = ({ showItems }: NavbarProps) => {
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userObject')
    window.location.href = '/'
  }

  return (
    <header className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.leftNavbar}>
          {/* Logo */}
          <Link
            to={showItems ? '/pages/home' : '/'}
            className={styles.navbarLogoLink}
          >
            <img className={styles.navbarLogo} src={Uplift1} alt="logo" />
          </Link>
          {showItems && (
            <nav className={styles.navbarLinks}>
              <a href="/pages/Home">Home</a>
              <a href="/pages/Reflection">Reflection</a>
              <a href="/pages/ReflectionList">Reflection List</a>
            </nav>
          )}
        </div>
        <div className={styles.rightNavbar}>
          {showItems && (
            <bootstrap.Button
              variant="primary"
              type="submit"
              className={styles.logoutButton}
              onClick={handleLogout}
            >
              Log out
            </bootstrap.Button>
          )}
          <bootstrap.Button
            variant="primary"
            type="submit"
            className={styles.reflectionButton}
          >
            Reflection Pro
          </bootstrap.Button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
