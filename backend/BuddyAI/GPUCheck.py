import torch
print(f'GPU Available: {torch.cuda.is_available()}')  # Should print True if GPU is available
print(f'Device Being Used: {torch.cuda.current_device()}')  # Prints the current device being used (e.g., 0 for the first GPU)
print(f'GPU Name: {torch.cuda.get_device_name(torch.cuda.current_device())}')  # Name of the GPU being used
