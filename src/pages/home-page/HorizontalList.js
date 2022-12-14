import React, { useMemo } from 'react'
import { Card } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Skeleton } from '@material-ui/lab'
import { useSelector } from 'react-redux'
import ProductCard from './ProductCard'

const useStyles = makeStyles((theme) => ({
    root: {
      minWidth: "250px",
      width: "300px",
      margin: "10px",
      padding: "15px"
    }
}))

function HorizontalList(props) {
    
    const classes = useStyles();

    let products = useSelector(state => state.products.list);

    products = useMemo(() => products?.filter(p => p.tags?.includes(props.filter)) || [], [products])

    return (
        <div>
            <h2 class="text-base font-bold my-2">{props.title || ""}</h2>

            {products.length > 0 ? 
                <div className="flex flex-no-wrap overflow-auto">
                    {products.map(product => (
                        <ProductCard product={product} />
                    ))}
                </div>
                :
                <div className="flex flex-no-wrap overflow-auto">
                    {['', '', ''].map(() => (
                        <Card className={classes.root}>
                            <Skeleton
                                variant="rect"
                                height="175px"
                                className="mb-2"
                                animation="wave"
                            />

                            <Skeleton
                                variant="rect"
                                className="mb-2"
                                width= "80%"
                                animation="wave"
                            />

                            <Skeleton
                                variant="rect"
                                className="mb-2"
                                height= "40px"
                                animation="wave"
                            />
                            
                        </Card>
                    ))}
                </div>
            }

        </div>
    )
}

export default HorizontalList