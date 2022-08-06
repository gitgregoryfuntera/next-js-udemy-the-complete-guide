import classes from './post-grid.styles.module.css';
import PostItem from './post-item';
const PostGrid = ({posts}) => {
    return (
        <>
            <ul className={classes.grid}>
                {
                    posts.map(post => <PostItem/>)
                }
            </ul>
        </>
    )
}

export default PostGrid;