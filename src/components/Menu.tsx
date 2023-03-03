import { useState, useEffect } from 'react'
import { Card, CardContent, Grid, Pagination, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material'
import ViewListIcon from '@mui/icons-material/ViewList'
import ViewModuleIcon from '@mui/icons-material/ViewModule'
import { Link, Route } from 'react-router-dom'

interface BookList {
    list_name: string
    list_name_encoded: string
    display_name: string
    updated: string
    list_image: string
}

export function Menu() {
    const [bookLists, setBookLists] = useState<BookList[]>([])
    const [page, setPage] = useState(1)
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const API_KEY = "OOZ7G7O3d1VuZ2AIXmaHG3viqKwWNAjJ"

    useEffect(() => {
        fetch(`https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${API_KEY}&page=${page}`)
            .then(response => response.json())
            .then(data => setBookLists(prevBookLists => [...prevBookLists, ...data.results]))
            .catch(error => console.error(error))
    }, [page])

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
    }

    const handleChangeViewMode = (event: React.MouseEvent<HTMLElement>, newViewMode: "grid" | "list") => {
        if (newViewMode !== null) {
            setViewMode(newViewMode)
        }
    }

    return (
        <div>
            <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={handleChangeViewMode}
                aria-label="view mode"
                sx={{ float: 'right' }}
            >
                <ToggleButton value="list" aria-label="list view">
                    <ViewListIcon />
                </ToggleButton>
                <ToggleButton value="grid" aria-label="grid view">
                    <ViewModuleIcon />
                </ToggleButton>
            </ToggleButtonGroup>
            {viewMode === "grid" ? (
                <Grid container spacing={2} px={4} py={2}>
                    {bookLists.slice((page - 1) * 10, page * 10).map(bookList => (
                        <Grid item xs={12} md={6} lg={6} key={bookList.list_name_encoded}>
                            <Link to="/bookListPage" style={{ textDecoration: "none" }} >
                                <Card style={{ backgroundColor: '#008B8B' }}>
                                    <CardContent>
                                        <Typography variant="h5" component="h2">
                                            {bookList.display_name}
                                        </Typography>
                                        <Typography color="textSecondary">
                                            {bookList.list_name}
                                        </Typography>
                                        <Typography variant="body2" component="p">
                                            {bookList.updated}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <div>
                    {bookLists.slice((page - 1) * 5, page * 5).map(bookList => (
                        <Grid container px={4} py={2} key={bookList.list_name_encoded}>
                            <Grid item xs={6}>
                                <Link to="/bookListPage" style={{ textDecoration: "none" }} >
                                    <Card style={{ backgroundColor: '#008B8B' }}>
                                        <CardContent>
                                            <Typography variant="h5" component="h2">
                                                {bookList.display_name}
                                            </Typography>
                                            <Typography color="textSecondary">
                                                {bookList.list_name}
                                            </Typography>
                                            <Typography variant="body2" component="p">
                                                {bookList.updated}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </Grid>
                        </Grid>
                    ))}
                </div>
            )}
            <Pagination count={10} page={page} onChange={handlePageChange} />
        </div>
    )
}
