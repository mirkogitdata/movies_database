import React from 'react';
import { Modal } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import MovieCard from '../components/MovieCard';

const reorder = (list, startIndex, endIndex) => {
   const result = Array.from(list);
   const [removed] = result.splice(startIndex, 1);
   result.splice(endIndex, 0, removed);
   return result;
};
const grid = 2;

const getItemStyle = (isDragging, draggableStyle) => ({
   userSelect: 'none',
   padding: grid * 2,
   width: '100%',
   margin: `0 0 ${grid}px 0`,
   background: isDragging ? 'lightgreen' : 'transparent',
   ...draggableStyle,
});
const getListStyle = (isDraggingOver) => ({
   background: isDraggingOver ? 'lightblue' : 'transparent',
   padding: grid,
   width: '100%',
});

function FavoriteList({
   favorite,
   setFavorite,
   modalShow,
   setModalShow,
   removeFromFavoriteList
}) {
   const onDragEnd = (result) => {
      if (!result.destination) {
         return;
      }
      const newFavoriteList = reorder(
         favorite,
         result.source.index,
         result.destination.index
      );

      setFavorite(newFavoriteList);
   };
   return (
      <Modal
         title='Movies List'
         open={modalShow}
         footer={null}
         onOk={() => setModalShow(false)}
         onCancel={() => setModalShow(false)}
      >
         <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='droppable'>
               {(provided, snapshot) => (
                  <div
                     {...provided.droppableProps}
                     ref={provided.innerRef}
                     style={getListStyle(snapshot.isDraggingOver)}
                  >
                     {favorite.map((movie, index) => (
                        <Draggable
                           key={movie.imdbID}
                           draggableId={movie.imdbID}
                           index={index}
                        >
                           {(provided, snapshot) => (
                              <div
                                 key={movie.imdbID}
                                 ref={provided.innerRef}
                                 {...provided.draggableProps}
                                 {...provided.dragHandleProps}
                                 style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                 )}
                              >
                                 <MovieCard
                                    movie={movie}
                                    removeFromFavoriteList={removeFromFavoriteList}

                                 />
                              </div>
                           )}
                        </Draggable>
                     ))}
                     {provided.placeholder}
                  </div>
               )}
            </Droppable>
         </DragDropContext>
      </Modal>
   );
}

export default FavoriteList;
FavoriteList.propTypes = {
   favorite: PropTypes.arrayOf(
      PropTypes.shape({
         imdbID: PropTypes.string.isRequired,
         Title: PropTypes.string.isRequired,
         Year: PropTypes.string.isRequired,
         Rated: PropTypes.string.isRequired,
         Country: PropTypes.string.isRequired,
         Poster: PropTypes.string.isRequired,
      })
   ).isRequired,
   setModalShow: PropTypes.func.isRequired,
   setFavorite: PropTypes.func.isRequired,
   removeFromFavoriteList: PropTypes.func.isRequired
};
