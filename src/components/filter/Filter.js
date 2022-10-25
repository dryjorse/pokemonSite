import React, { useEffect, useState } from "react";
import s from './filter.module.css'
import arrow from '../../img/filterImg/keyboard_arrow_up.svg'
import checkedRadio from '../../img/filterImg/checkedRadio_pokemon.svg'
import radioIcon from '../../img/filterImg/radioIcon_pokemon.svg'
import checkboxIcon from '../../img/filterImg/checkbox_pokemon.svg'
import checkedChecbox from '../../img/filterImg/checked_checbox_pokemon.svg'
import { useDispatch, useSelector } from "react-redux";
import { clearTypesAction, getDamageTypesAction, getGenerationsAction, getTypesAction, orderPokemonsAction, setCurrentPokemonsAction, setSortedPokemonsAction } from "../../redux/actions/actions";
import { Accordion, AccordionDetails, AccordionSummary, Box, Checkbox, RadioGroup, FormControlLabel, Radio, Typography, FormGroup } from "@mui/material";
import { physicalDamageTypes, selectedDamageTypes, selectedGenerations, selectedPokemons, selectedTypes, specialDamageTypes } from "../../redux/selectors";

function Filter () {
    const dispatch = useDispatch()
    const generations = useSelector(selectedGenerations)
    const types = useSelector(selectedTypes)
    const damageTypes = useSelector(selectedDamageTypes)
    const physicalTypes = useSelector(physicalDamageTypes)
    const specialTypes = useSelector(specialDamageTypes)
    const pokemons = useSelector(selectedPokemons)
    const sortElem = useSelector(state => state.pokemonsReducer.sortElement)
    const [currGeneration, setCurrGeneration] = useState('')
    const [currDamageType, setCurrDamageType] = useState([])
    const [currTypes, setCurrTypes] = useState([])

    const filterPokemons = () => {
        if(pokemons){
            let updatedPokemons = pokemons
            
            if(currGeneration){
                updatedPokemons = updatedPokemons.filter((pok) => pok.generation === currGeneration)
            }

            if(currDamageType.length){
                updatedPokemons = updatedPokemons.filter((pok) => currDamageType.includes(pok.move_damage_classes) )
            }

            if(currTypes.length){
                updatedPokemons = updatedPokemons.filter((pok) => currTypes.includes(pok.types[0]?.type.name) )
            }

            dispatch(setCurrentPokemonsAction(updatedPokemons))

            if(sortElem){
                dispatch(setSortedPokemonsAction(sortElem))
            } else {
                dispatch(orderPokemonsAction('order'))
            }
            
        }
        
    }

    const handleCurrGeneration = (e, value) => {
        setCurrGeneration(value)
    }

    const handleCurrDamageTypes = (e, checked) => {
        if(checked){
            setCurrDamageType([...currDamageType, e.target.value])
        } else {
            setCurrDamageType(currDamageType.filter(damageType => damageType !== e.target.value))
        }
    }

    const handleCurrTypes = (e, checked) => {
        if(checked){
            setCurrTypes([...currTypes, e.target.value])
        } else {
            setCurrTypes(currTypes.filter(type => type !== e.target.value))
        }
    }

    useEffect(() => {
        filterPokemons()
    }, [currGeneration, currDamageType, currTypes])

    return (
        <div className={s.main}>
            <div className={s.figure}></div>
                <ul className={s.filters}>
                    <FilterBlock filterName={'Поколение'} filter={generations?.results} filterFunc={handleCurrGeneration} 
                    name={'generation'} inState={currGeneration} type={'radio'}/>
                    <FilterBlock filterName={'Типы'} filter={damageTypes} filterFunc={handleCurrDamageTypes} 
                    inState={currDamageType}  name={'types'} type={'checkbox'}/>
                    {physicalTypes &&  <FilterBlock filterName={'Физические'} inState={currTypes} filterFunc={handleCurrTypes}  
                    filter={physicalTypes} type={'checkbox'}/>}
                    {physicalTypes &&  <FilterBlock filterName={'Специальные'} inState={currTypes} filterFunc={handleCurrTypes}
                    filter={specialTypes} type={'checkbox'}/>}
                </ul>
            
        </div>
    )
}

function FilterBlock ({filterName, filter, filterFunc, type, inState}) {
    const dispatch = useDispatch()

    const styleAccordion = {
        fontFamily: 'Poppins, sans-serif',
        boxShadow: 'none',
    }

    const styleAccordionSummary = [
        {
            minHeight: '0',
            '.MuiAccordionSummary-content': {
                margin: '0px !important',
            },
        }
    ]
    
    const styleAccordionDetails = [
        {
            marginTop: '16px !important',
            padding: '0px 20px !important'
        }
    ]

    const styleAccordionBtn = {
        fontSize: '16px',
        fontWeight: '600',
        lineHeight: '150%',
        cursor: 'pointer'
    }

    const styleAccordionBox = {
        display: 'flex',
        flexDirection: 'column',
    }

    const styleCheckLabels = {
        width: 'fit-content',
    }

    

    const Icon = ({iconLink, className}) => {
        return <img src={iconLink} className={className} alt="accordionImg" />
    }

    const FilterButtonsRadio = ({control}) => {
        return filter && filter.map((filt, key) => (
            <FormControlLabel 
                key={key}
                label={filt.labelName}
                value={filt.name}
                control={control}
                sx={styleCheckLabels}
            />
        ))
    }

    const FilterButtonsCheckbox = () => {
        return filter && filter.map((filt, key) => (
            <FormControlLabel 
                key={key}
                label={filt.labelName}
                value={filt.name}
                control={ <Checkbox checked={inState.includes(filt.name)} onChange={filterFunc} 
                checkedIcon={<Icon iconLink={checkedChecbox} />} icon={<Icon iconLink={checkboxIcon} />} />}
                sx={styleCheckLabels}
            />
        ))
    }

    return (
        <li className={s.filtersList}>
            <Accordion sx={styleAccordion}>
                <AccordionSummary
                    id='filter-panel1'
                    aria-controls='panel1-content'
                    expandIcon={<Icon className='arrowIcon' iconLink={arrow}/>}
                    sx={styleAccordionSummary}
                >
                    <Typography sx={styleAccordionBtn} >{filterName}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={styleAccordionDetails}>
                    <Box sx={styleAccordionBox}>
                        {
                            type === 'radio' && <RadioGroup onChange={filterFunc}> <FilterButtonsRadio control={
                                <Radio checkedIcon={<Icon iconLink={checkedRadio} />} icon={<Icon iconLink={radioIcon} />} 
                            />} /></RadioGroup>
                        } 
                        {
                            type === 'checkbox' &&  <FormGroup > 
                                <FilterButtonsCheckbox ></FilterButtonsCheckbox> </FormGroup>
                        }
                    </Box>
                </AccordionDetails>
            </Accordion>
        </li>
    )
}

export default Filter;