import { Book } from "../types/Book";
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import {FC} from "react";

interface BookCardProps {
    book: Book;
    onViewDetails: (bookId: string) => void;
}

const BookCard: FC<BookCardProps> = ({ book, onViewDetails }) => {
    return (
        <Card>
            <CardMedia
                component="img"
                height="140"
                image={book.thumbnail}
                alt={book.title}
            />
            <CardContent>
                <Typography variant="h6">{book.title}</Typography>
                <Typography variant="body2">By {book.author}</Typography>
                <Typography variant="body2">${book.price.toFixed(2)}</Typography>
                <Button onClick={() => onViewDetails(book.id)}>View Details</Button>
            </CardContent>
        </Card>
    );
};

export default BookCard;