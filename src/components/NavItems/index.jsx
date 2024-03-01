import PropTypes from 'prop-types';
const NavItems = ({ className, items }) => (
    <ul className={className}>
        {items.map((item, index) => (
            <li key={index}><a href={item.link}>{item.name}</a></li>
        ))}
    </ul>
);

NavItems.propTypes = {
    className: PropTypes.string,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            link: PropTypes.string,
            name: PropTypes.string,
        })
    ),
};

export default NavItems;