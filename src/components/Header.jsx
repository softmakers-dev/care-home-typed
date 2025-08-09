import MainNavigation from "./MainNavigation.jsx";
import GitHubAvatar from "./GitHubAvatar.jsx";

export default function Header() {

    return (
        <header style={styles.header}>
            <h1 style={styles.title}>Care-Home</h1>
            <MainNavigation />
            <GitHubAvatar />
        </header>
    );
}

// Simple inline styles for demonstration
const styles = {
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 2rem',
        borderBottom: '1px solid #eee',
        background: 'black',
        color: 'white',
        height: '40px'
    },
    navigation: {
        flex: 1
    }
};
