import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select'

export default function Inputs({ inputs, data, styles, setInfo }) {

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    setError,
    reset
  } = useForm({
    defaultValues: { ...data }
  })

  const onClear = () => {
    reset();
    setInfo({});
  };

  const onSubmit = (data) => setInfo({ ...data })

  return (
    <>

      {
        inputs.length > 0 ?
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              className={`grid grid-cols-${styles.cols} gap-2 place-content-start p-2`}
            // style={{
            //   display: 'grid',
            //   gridTemplateRows: `repeat(${styles.rows || 6}, auto)`,
            //   gap: '16px',
            //   gridAutoFlow: 'column',
            // }}
            >
              {
                inputs.map((item, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        display: item.display ? 'block'
                          :
                          item.display == undefined ? 'block'
                            :
                            'none',
                      }}>
                      <div className='grid grid-cols-1 place-content-start p-2'>
                        <label>{item.label}</label>
                        {
                          item.list ?

                            <Controller
                              control={control}
                              name={item.id}
                              rules={{
                                required: item.required,
                              }}
                              render={({ field: { onChange, value, name, ref } }) => (
                                <>
                                  {
                                    <Select
                                      placeholder='Seleccione'
                                      noOptionsMessage={() => 'Búsqueda no encontrada'}
                                      styles={{
                                        control: (basesStyles, state) => ({
                                          ...basesStyles,
                                          backgroundColor: 'transparent',
                                          color: '#000',
                                          width: '300px',
                                        }),
                                        multiValue: (styles) => ({
                                          ...styles,
                                          backgroundColor: 'transparent',
                                        }),
                                        menu: (styles) => ({
                                          ...styles,
                                          backgroundColor: 'white',
                                          width: '300px',
                                        }),
                                      }}

                                      theme={(theme) => ({
                                        ...theme,
                                        colors: {
                                          ...theme.colors,
                                          neutral0: 'white',
                                          primary25: 'grey',
                                          primary: 'grey',
                                          neutral80: 'black',

                                        },
                                      })}
                                      isMulti={item.multi}
                                      inputRef={ref}
                                      className="basic-single"
                                      classNamePrefix="select"
                                      options={item.options}
                                      isSearchable={true}
                                      defaultValue={
                                        item.multi ?

                                          value?.map(v => {
                                            return item.options?.find(c => c.value === v)
                                          })

                                          :
                                          item.options?.find(c => {
                                            if (value instanceof Array) {
                                              return value.includes(c.value)
                                            } else {
                                              return c.value === value
                                            }
                                          })
                                      }
                                      onChange={val => {

                                        if (val instanceof Array) {
                                          if (item?.set) {
                                            const setValue = item?.set
                                            setValue(val?.map(v => v.value))
                                          }
                                          onChange(val?.map(v => v.value))
                                        } else {
                                          if (item?.set) {
                                            const setValue = item?.set
                                            setValue(val.value)
                                          }
                                          if (item.array) {
                                            onChange([val.value])
                                          } else {
                                            onChange(val.value)
                                          }

                                        }
                                      }}
                                    />
                                  }


                                </>
                              )}
                            />
                            :
                            item.creatable ?
                              <Controller
                                control={control}
                                name={item.id}
                                rules={{
                                  required: item.required,
                                }}
                                render={({ field: { onChange, value, name, ref } }) => (
                                  <>
                                    {
                                      <CreatableSelect
                                        placeholder='Seleccione'
                                        noOptionsMessage={() => 'Búsqueda no encontrada'}
                                        formatCreateLabel={(inputValue) => `Agregar: ${inputValue}`}
                                        styles={{
                                          control: (basesStyles, state) => ({
                                            ...basesStyles,
                                            backgroundColor: 'transparent',
                                            color: '#000',
                                            width: '300px',
                                          }),
                                          multiValue: (styles) => ({
                                            ...styles,
                                            backgroundColor: 'transparent',
                                          }),
                                          menu: (styles) => ({
                                            ...styles,
                                            backgroundColor: 'white',
                                            width: '300px',
                                          }),
                                        }}

                                        theme={(theme) => ({
                                          ...theme,
                                          colors: {
                                            ...theme.colors,
                                            neutral0: 'white',
                                            primary: 'grey',
                                            neutral80: 'black',

                                          },
                                        })}
                                        isMulti={item.multi}
                                        inputRef={ref}
                                        className="basic-single"
                                        classNamePrefix="select"
                                        options={item.options}
                                        isSearchable={true}
                                        defaultValue={
                                          item.multi ?

                                            value?.map(v => {
                                              return item.options?.find(c => c.value === v)
                                            })

                                            :
                                            item.options?.find(c => c.value === value)
                                        }
                                        onChange={val => {

                                          if (val instanceof Array) {
                                            onChange(val.map(v => v.value))
                                          } else {
                                            if (item?.set) {
                                              const setValue = item?.set
                                              setValue(val.value)
                                            }
                                            onChange(val.value)
                                          }
                                        }}
                                      />
                                    }


                                  </>
                                )}
                              />
                              :
                              item.filterList ?
                                <Controller
                                  control={control}
                                  name={item.id}
                                  rules={{
                                    required: item.required,
                                  }}
                                  render={({ field: { onChange, value, name, ref } }) => (
                                    <>
                                      {
                                        <Select
                                          placeholder='Seleccione'
                                          noOptionsMessage={() => 'Búsqueda no encontrada'}
                                          formatCreateLabel={(inputValue) => `Agregar: ${inputValue}`}
                                          styles={{
                                            control: (basesStyles, state) => ({
                                              ...basesStyles,
                                              backgroundColor: 'transparent',
                                              color: '#000',
                                              width: '300px',
                                            }),
                                            multiValue: (styles) => ({
                                              ...styles,
                                              backgroundColor: 'transparent',
                                            }),
                                            menu: (styles) => ({
                                              ...styles,
                                              backgroundColor: 'white',
                                              width: '300px',
                                            }),
                                          }}
                                          theme={(theme) => ({
                                            ...theme,
                                            colors: {
                                              ...theme.colors,
                                              neutral0: 'white',
                                              primary: 'grey',
                                              neutral80: 'black',

                                            },
                                          })}
                                          isMulti={item.multi}
                                          inputRef={ref}
                                          className="basic-single"
                                          classNamePrefix="select"
                                          options={item.options}
                                          isSearchable={true}
                                          defaultValue={
                                            item.multi ?

                                              value?.map(v => {
                                                return item.options?.find(c => c.value === v)
                                              })

                                              :
                                              item.options?.find(c => c.value === value)
                                          }
                                          onChange={val => {
                                            if (val instanceof Array) {
                                              onChange(val.map(v => v.value))
                                            } else {
                                              if (item?.set) {
                                                const setValue = item?.set
                                                setValue(val.value)
                                              }
                                              onChange(val.value)
                                            }
                                          }}
                                          onInputChange={(inputValue) => {
                                            if (item?.getInfo) {
                                              item.getInfo(inputValue);
                                            }
                                          }}
                                        />
                                      }
                                    </>
                                  )}
                                />
                                :
                                item.numeric ?
                                  <input
                                    id={item.id}
                                    className='inputs'
                                    placeholder={item.placeholder}
                                    {...register(item.id, {
                                      required: item.required,
                                      validate: (value, formVals) => {
                                        setError(item.id, {
                                          type: 'validate',
                                          message: item.error.message
                                        })
                                        return !isNaN(value);
                                      },
                                      valueAsNumber: true,
                                    })}

                                  />
                                  :
                                  item.cuantity ?
                                    <input
                                      id={item.id}
                                      className='inputs'
                                      placeholder={item.placeholder}
                                      {...register(item.id, {
                                        required: item.required,
                                        validate: (value, formVals) => {
                                          setError(item.id, {
                                            type: 'validate',
                                            message: item.error.message
                                          })
                                          if (value < 1) {
                                            return false
                                          }
                                          return !isNaN(value);
                                        },
                                        pattern: {
                                          value: /^[0-9]+$/,
                                          message: 'Este campo es numérico'
                                        },
                                        valueAsNumber: true,
                                      })}
                                      onKeyDown={(e) => {
                                        const teclasPermitidas = [
                                          "Backspace", "Delete", "Tab", "Escape", "Enter",
                                          "ArrowLeft", "ArrowRight", "Home", "End"
                                        ];
                                        const currentValue = e.target.value;
                                        const key = e.key;
                                        if (teclasPermitidas.includes(e.key)) {
                                          return;
                                        } else if ((key === '0' || key === '-') && currentValue.length === 0) {
                                          e.preventDefault();
                                        } else if (key === '-') {
                                          e.preventDefault();
                                        } else if (!/^[0-9]$/.test(e.key)) {
                                          e.preventDefault();
                                        }
                                      }}
                                    />
                                    :
                                    item.file ?
                                      <input
                                        className='block min-w-0 outline-1 rounded-lg grow py-1.5 pr-3 pl-1'
                                        type={item.type}
                                        {...register(item.id, {
                                          required: item.required,
                                        })}
                                      />
                                      :
                                      <input
                                        type={item.type}
                                        className='block min-w-0 outline outline-[rgb(179,179,179)] focus:outline-[#808080] focus:outline-2 rounded-sm grow  py-1.5 pr-3 pl-1'
                                        id={item.id}
                                        placeholder={item.placeholder}
                                        {...register(item.id, {
                                          required: item.required,
                                        })}
                                      />
                        }

                        {
                          errors[item.id]?.type == 'required'
                            ?
                            <div
                              style={{
                                color: 'red'
                              }}>
                              Este campo es obligatorio
                            </div>
                            :
                            errors[item.id]?.type == 'validate'
                              ?
                              <div
                                style={{
                                  color: 'red'
                                }}>
                                {item.error.message}
                              </div>
                              :
                              <></>
                        }
                      </div>


                    </div>
                  )
                })
              }
            </div>

            <div style={
              {
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "center",
                padding: "0px 0px 30px 0px"
              }
            }
            >
              <button
                color="primary"
                type='submit'
                style={
                  {
                    border: "1px solid gray",
                    padding: "10px 30px",
                    borderRadius: "10px",
                    background: "none",
                    cursor: "pointer",
                  }
                }>{
                  styles.textButton
                }</button>
              {
                styles.clearButton &&
                <button
                  color="primary"
                  type='button'
                  style={
                    {
                      border: "1px solid gray",
                      padding: "10px 30px",
                      borderRadius: "10px",
                      background: "none",
                      cursor: "pointer",
                    }
                  } onClick={() => {
                    onClear()
                  }}>Limpiar</button>
              }
            </div>


          </form>
          :
          <></>
      }


    </>
  )
}