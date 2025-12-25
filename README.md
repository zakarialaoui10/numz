# Numz
Scientific computing in [zikojs](https://github.com/zakarialaoui10/zikojs)

## API Reference

### Typed Matrix 
- Class Constructors : `I8Matrix`, `I16Matrix`, `I32Matrix`,`U8Matrix`, `U16Matrix`, `U32Matrix`, `F16Matrix`, `F32Matrix`, `F64Matrix`, `BI64Matrix`, `BU64Matrix`
- Functional Constrcuctors : `matrix_i8`, `matrix_i16`, `matrix_i32`, `matrix_u8`, `matrix_u16`, `matrix_u32`, `matrix_f16`, `matrix_f32`, `matrix_f64`, `matrix_bi64`, `matrix_bu64`,

### Signal

- Sequence functions : `zeros`, `ones`, `nums`, `arange`, `linspace`, `logspace`, `geomspace`.

- Pulse functions : `signum`, `ramp`, `rect`, `tri`, `dirac`, `lorentz`, `sinc`, `gaussian_pulse`, `exp_pulse`, `trapezoid`.

- Periodic functions : `square`, `tri_wave`, `sawtooth_wave`, `pulse_train`, `pwm`, `sinusoid`

- Window functions : `hamming_window`, `hanning_window`, `kaiser_window`, `blackman_window`, `bartlett_window`, `blackman_harris_window`, `nuttall_window`, `flat_top_window`, `tukey_window`, `gaussian_window`, `lanczos_window`, `poisson_window`, `rect_window`, `tri_window`.

- conv : `conv`, `conv2`,

- fft : `fft`, `ifft`, `fft2`, `ifft2`


<!-- 
wasm ?
golang? 
c ?
py
-->