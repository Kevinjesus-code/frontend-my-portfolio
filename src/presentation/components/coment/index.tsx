import Styles from "./coment.module.css";

interface CommentProps {
    author: string;
    role?: string;
    message: string;
    date: string;
    timeAgo: string;
    avatarUrl?: string;
    isPinned?: boolean;
}

const Comment = ({ author, role, message, date, timeAgo, avatarUrl, isPinned }: CommentProps) => {
    return (
        <div className={Styles.comment}>
            {isPinned && (
                <div className={Styles.pinnedBadge}>
                    📌 Pinned Comment
                </div>
            )}
            <div className={Styles.commentHeader}>
                <div className={Styles.avatarContainer}>
                    {avatarUrl ? (
                        <img src={avatarUrl} alt={author} className={Styles.avatar} />
                    ) : (
                        <div className={Styles.avatarPlaceholder}>
                            {author.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>
                <div className={Styles.authorInfo}>
                    <div className={Styles.authorName}>
                        {author}
                        {role && <span className={Styles.role}>{role}</span>}
                    </div>
                    <div className={Styles.commentDate}>{date}</div>
                </div>
                <div className={Styles.timeAgo}>{timeAgo}</div>
            </div>
            <div className={Styles.commentMessage}>
                {message}
            </div>
        </div>
    );
};

export default Comment;