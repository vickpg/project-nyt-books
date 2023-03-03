import { useState, useEffect } from 'react'
import { Card, CardContent, CardMedia, Grid, Pagination, Typography, Button } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Link } from 'react-router-dom'

interface Book {
  title: string
  author: string
  description: string
  publisher: string
  price: number
  rank: number
  buy_link: string
  book_image: string
}

export function BookListPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [page, setPage] = useState(1)
  const API_KEY = "OOZ7G7O3d1VuZ2AIXmaHG3viqKwWNAjJ"
  const listNameEncoded = "hardcover-fiction"

  useEffect(() => {
    fetch(`https://api.nytimes.com/svc/books/v3/lists/${listNameEncoded}.json?api-key=${API_KEY}&page=${page}`)
      .then(response => response.json())
      .then(data => setBooks(data.results.books))
      .catch(error => console.error(error))
  }, [page])

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }


  return (
      <div>
        <Link to="/">
        <IconButton>  
          <ArrowBackIcon />
        </IconButton>
        </Link>
        <Grid container spacing={2} px={4} py={2}>
          {books.slice((page - 1) * 4, page * 4).map(book => (
            <Grid item xs={12} md={12} key={book.rank}>
              <Card sx={{ display: 'flex' }}>
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={book.book_image}
                  alt={book.title}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h5" component="h2">
                    {book.title}
                  </Typography>
                  <Typography color="textSecondary">
                    {book.author}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {book.description}
                  </Typography>
                  <Typography color="textSecondary">
                    {book.publisher}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Price: ${book.price}
                  </Typography>
                  <Typography variant="body2" component="p">
                    Rank: {book.rank}
                  </Typography>
                  <Button variant="contained" href={book.buy_link} target="_blank">
                    Buy now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Pagination count={10} page={page} onChange={handlePageChange} />
      </div>
  )
}
