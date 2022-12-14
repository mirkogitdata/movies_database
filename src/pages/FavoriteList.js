import React, { useContext } from 'react';
import { Modal } from 'antd';
import AuthContext from '../context/auth-context';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import FavoriteCard from '../components/FavoriteCard/FavoriteCard';

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

const FavoriteList = () => {

   const context = useContext(AuthContext);

   const onDragEnd = (result) => {
      if (!result.destination) {
         return;
      }
      const newFavoriteList = reorder(
         context.favorite,
         result.source.index,
         result.destination.index
      );

      context.setFavorite(newFavoriteList);
   };
   return (
      <Modal
         title='Movies List'
         open={context.modalShow}
         footer={null}
         onOk={() => context.setModalShow(false)}
         onCancel={() => context.setModalShow(false)}
      >
         <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='droppable'>
               {(provided, snapshot) => (
                  <div
                     {...provided.droppableProps}
                     ref={provided.innerRef}
                     style={getListStyle(snapshot.isDraggingOver)}
                  >
                     {context.favorite.map((movie, index) => (
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
                                 <FavoriteCard
                                    movie={movie}
                                    removeFromFavoriteList={context.removeFromFavoriteList}

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
