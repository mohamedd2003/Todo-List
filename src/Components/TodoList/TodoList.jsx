import React, { useRef, useState ,useEffect} from 'react'
import Container from '@mui/material/Container'
import InputAdornment from '@mui/material/InputAdornment';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Box, Grid, TextField, Typography, Button, Alert, FormControlLabel } from '@mui/material'
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import { useFormik } from 'formik';
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { add, remove, update, setInnerHtmlBtn } from '../../Redux/TodoSlice';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { Delete } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';


export default function TodoList() {

  const textfieldRef = useRef(null);
    let dispatch = useDispatch()
  let { tasks } = useSelector(state => state.todo)
  let { innerHtmlBtn } = useSelector(state => state.todo)
  let validationSchema = yup.object({task: yup.string().min(3, 'Minmum Characters is 3 ').max(100, "Maximum Characters is 100").required()})
  
  let addTask = () => {
  }
  const handleButtonClick = () => {
if(textfieldRef.current.value != "")
{
  if (innerHtmlBtn === "Add" ) {
    dispatch(add(formik.values.task));
   
  }
  else {
    dispatch(update({ index: formik.values.index, updatedTask: formik.values.task }));
   
  }
} 
    textfieldRef.current.value = null;  
  };
  let formik = useFormik({
      initialValues:
      {
        task: "",
        index: 0
      }
      , validationSchema,
      onSubmit: addTask})


  const getTaskInfo = (index) => {

    formik.setValues({
      ...formik.initialValues,
      index: index,
    });
    textfieldRef.current.value = tasks[index]
    dispatch(setInnerHtmlBtn("Update"));

  };
     

  // const resetForm =()=>
  // {
  //   tasks.map(task=>)
  // }
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  useEffect(() => {
      
    setButtonDisabled(!(formik.isValid && formik.dirty));
  }, [formik.isValid, formik.dirty]);   

  


  const [checked, setChecked] = useState([0]);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };


  return (
    <>

      <Container>
        <Grid item xs={12} md={6} overflow={'hidden'}  >
          <Typography component="h1" variant='h3' color={"#fff"} textAlign={'center'} mt={8}> Todo List App</Typography>
          <Box component='form' onSubmit={formik.handleSubmit} >
            <TextField
              inputRef={textfieldRef}
              name='task'
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.name}
              sx={{ mx: 'auto', mt: "24px", display: "block" }}
              label="Enter Your Task"
              variant='outlined'
              fullWidth
              InputProps={{
                startAdornment: <InputAdornment position="start">
                  <FormatListNumberedIcon />
                </InputAdornment>,
              }}
            >

            </TextField>
            {formik.errors.task && formik.touched.task ? <Alert severity="error" sx={{ mt: "10px" }}>{formik.errors.task}</Alert> : ''}
            <Box sx={{ display: 'flex', float: 'right', mt: "10px" }} >
          <Button
                type='submit'
                size='medium'
                sx={{ mr: "5px", color: 'primary.main' }}
                startIcon={<AddCircleIcon />}
                variant='outlined'
                onClick={()=>handleButtonClick()}
                 >
                {innerHtmlBtn}
              </Button>
            
             
             {/* <button type='submit' disabled id='btn'> {innerHtmlBtn}</button>  */}
              {/* <Button
                disabled={ !(formik.isValid && formik.dirty)
                }
                type='submit'
                size='medium'
                sx={{ color: 'primary.light' }}
                startIcon={<RestartAltIcon />}
                variant='outlined'
              // onClick={ }
              >
                Reset
              </Button> */}
            </Box>
          </Box>
          {tasks.map((task, index) =>
            <List key={index} sx={{ mt: "10px", clear: 'both' }}>
              {[0].map((value, index1) => {
                const labelId = `checkbox-list-label-${value}`;

                return (
                  <ListItem key={index1} sx={{ backgroundColor: "rgba(100,10,70,.2)" }}
                    secondaryAction={

                      <Box>

                        <IconButton edge="end" sx={{ color: 'red' }} onClick={() => dispatch(remove(index))} >
                          <Delete />
                        </IconButton>

                        <IconButton
                          onClick={() => {
                            getTaskInfo(index)
                          }
                          }
                          sx={{ ml: "20px", color: "green" }}
                        >
                          <EditIcon />
                        </IconButton>

                      </Box>
                    }
                    disablePadding
                  >
                    <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                      <ListItemIcon>
                        <FormControlLabel control={<Checkbox color="error" />} />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={task} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          )}
        </Grid>
      </Container>
    </>
  )
}
