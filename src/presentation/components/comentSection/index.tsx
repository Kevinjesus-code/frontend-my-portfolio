import { useState } from "react";
import Styles from "./comentSection.module.css";
import { DSAInputForm, DSATextArea, DSAButton, DSAFileUpload, DSAComment } from "..";
import { MessageSquare } from "lucide-react";

interface CommentData {
    id: string;
    author: string;
    role?: string;
    message: string;
    date: string;
    timeAgo: string;
    avatarUrl?: string;
    isPinned?: boolean;
}

const CommentsSection = () => {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [profilePhoto, setProfilePhoto] = useState<File | null>(null);

    // Datos de ejemplo de comentarios
    const [comments] = useState<CommentData[]>([
        {
            id: "1",
            author: "ENEN",
            role: "Admin",
            message: "Thanks for visiting! Contact me if you need anything",
            date: "Jun 3, 2025",
            timeAgo: "",
            isPinned: true
        },
        {
            id: "2",
            author: "dfkfkfd",
            message: "dfsfsdf",
            date: "",
            timeAgo: "6h ago"
        },
        {
            id: "3",
            author: "dsd",
            message: "dsdsD",
            date: "",
            timeAgo: "fh ago"
        }
    ]);

    const handleSubmit = () => {
        console.log("Name:", name);
        console.log("Message:", message);
        console.log("Profile Photo:", profilePhoto);
        // Aquí iría la lógica para enviar el comentario
    };

    return (
        <div className={Styles.commentsSection}>
            <div className={Styles.header}>
                <MessageSquare size={24} />
                <h2>Comments ({comments.length})</h2>
            </div>

            <div className={Styles.commentsGrid}>
                {/* Columna izquierda: Formulario */}
                <div className={Styles.formColumn}>
                    <h3 className={Styles.columnTitle}>Leave a Comment</h3>
                    <div className={Styles.commentForm}>
                        <DSAInputForm
                            type="text"
                            placeholder="Enter your name"
                            icon="User"
                            label="Name"
                            required
                            value={name}
                            onChange={setName}
                        />

                        <DSATextArea
                            placeholder="Write your message here..."
                            value={message}
                            onChange={setMessage}
                            label="Message"
                            required
                            rows={5}
                            icon="MessageSquare"
                        />

                        <DSAFileUpload
                            label="Profile Photo"
                            optional
                            maxSize="5MB"
                            onFileSelect={setProfilePhoto}
                        />

                        <DSAButton
                           
                            onClick={handleSubmit}
                            
                        > <span>Send</span></DSAButton>
                    </div>
                </div>

                {/* Columna derecha: Lista de comentarios */}
                <div className={Styles.commentsColumn}>
                    <h3 className={Styles.columnTitle}>All Comments</h3>
                    <div className={Styles.commentsList}>
                        {comments.map((comment) => (
                            <DSAComment
                                key={comment.id}
                                author={comment.author}
                                role={comment.role}
                                message={comment.message}
                                date={comment.date}
                                timeAgo={comment.timeAgo}
                                avatarUrl={comment.avatarUrl}
                                isPinned={comment.isPinned}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentsSection;