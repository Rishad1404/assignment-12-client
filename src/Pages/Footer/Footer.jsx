import logo from '../../../public/logo.png'
const Footer = () => {
    return (
        <footer className="footer footer-center p-4 bg-base-300 text-base-content">
            <aside className='flex'>
                <img src={logo} className='h-8 w-8' alt="" />
                <p>Copyright © 2024 - All right reserved by Topic Talk Forum </p>
            </aside>
        </footer>
    );
};

export default Footer;