import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList'
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import SortableList, { SortableItem } from 'react-easy-sort'
import { Button } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
    transform: 'translateZ(0)',
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  icon: {
    color: 'white',
  },
  imageblock: {
    width: 200,
    minHeight: 150,
    maxHeight: 150,
    padding: 5,
  },
  orderWrapper: {
    display: 'inline-block',
    textAlign: 'center',
    width: '200px'
  }
}));

export default function AdvancedGridList(props) {
  const classes = useStyles();
  //let tileData = [];
  const [tileData, setTileData] = useState([]);
  useEffect(() => {
    let tileDataNew = props.images.map((image, index) => {

      image.imageFilePath = image.imageFilePath;
      image.imageOrder = image.imageOrder;
      return image;

    })
    tileDataNew.sort(function (a, b) {
      if (a.imageOrder < b.imageOrder) {
        return -1;
      }
      else if (a.imageOrder > b.imageOrder) {
        return 1;
      }
      return 0;
    });
    setTileData(tileDataNew)
    props.uploadimage(tileDataNew)
  }, [props.images]);


  const onSortEnd = (oldIndex, newIndex) => {
    let newOrder = [...tileData];
    newOrder = move(newOrder, oldIndex, newIndex);
    newOrder = newOrder.map((el, index) => {
      el.imageOrder = index + 1;
      return el;
    });

    setTileData(newOrder)
    props.uploadimage(newOrder)
  }

  const move = (arr, old_index, new_index) => {
    while (old_index < 0) {
      old_index += arr.length;
    }
    while (new_index < 0) {
      new_index += arr.length;
    }
    if (new_index >= arr.length) {
      var k = new_index - arr.length;
      while ((k--) + 1) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
  }



  return (props.loading ?

    <div className={"container"}>

      <div className="container spinner-center spinner spinner-primary spinner-lg mr-15"></div>
    </div>
    :
    <div className={classes.root}>
      <div >
        <SortableList onSortEnd={onSortEnd} >
          {tileData.map((item, index) => (
            <SortableItem key={index} >
              <div className={classes.orderWrapper}>
                <img src={item.imageFilePath} className={classes.imageblock} />
                <Button
                  style={{ backgroundColor: '#bb2121' }}
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    props.removeImage(index)

                  }}
                >
                  Delete
                </Button>  {item.imageOrder}
              </div>
            </SortableItem>
          ))}
        </SortableList>
      </div>
    </div>
  );
}