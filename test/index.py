from scipy import signal
image = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

kernel = [
    [1, 0],
    [0, 1]
]
print(
    signal.convolve2d(image, kernel, 'full')
)