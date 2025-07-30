import { Link } from 'react-router-dom'
import styles from './Navbar.module.scss'
import Uplift1 from '../../Assests/UpLift1.svg'
import * as bootstrap from 'react-bootstrap'

interface NavbarProps {
  showItems: boolean
}
const Navbar = ({ showItems }: NavbarProps) => {
  return (
    <header className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.leftNavbar}>
          {/* Logo */}
          <Link to="/" className={styles.navbarLogoLink}>
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
        <bootstrap.Button
          variant="primary"
          type="submit"
          className={styles.reflectionButton}
        >
          Reflection Pro
        </bootstrap.Button>
      </div>
    </header>
  )
}

export default Navbar
