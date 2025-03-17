from itertools import combinations
from collections import defaultdict

class SignalFlowGraph:
    def __init__(self, graph):
        self.graph = graph
        self.node_count = len(graph)
        self.paths = None
        self.cycles = None
        self.cycle_gains = None
        self.path_gains = None
        self.path_deltas = None
        self.non_touching_cycles = None
        self.visited = {node: False for node in self.graph}
        self.start_node = None
        self.end_node = None
        self.total_delta = None
        self.transfer_func = None
        self.optimize_graph() # first step

    def optimize_graph(self):
    # This function is used to optimize the graph by removing self loops and parallel edges
        return

    def detect_cycles(self):

        return 

    def dfs_cycles(self, node, start, path):
        path.append(node)


    def is_duplicate_cycle(self, new_cycle):

        return 

    def are_elements_equal(self, arr1, arr2):
        return 

    def are_circular_identical(self, arr1, arr2):

        return 

    def get_non_touching_cycles(self):

        return 

    def get_n_non_touching_cycles(self, n):

        return 

    def are_non_touching(self, comb):

        return 

    def do_cycles_touch(self, cycle1, cycle2):
        return 

    def find_start_node(self):

        return 

    def find_end_node(self):

        return 

    def get_paths(self):

        return 

    def dfs_paths(self, node, end, path):
        self.visited[node] = True
        
        

    def compute_gain(self, path):

        return 

    def compute_cycle_gains(self):

        return 

    def compute_path_gains(self):

        return 

    def compute_total_delta(self):

        return 

    def compute_path_deltas(self):

        return 

    def compute_delta_for_path(self, path):

        return 

    def compute_transfer_function(self):

        return    

if __name__ == '__main__':
    graph={
        'A':[('B',1)],
        'B':[('C',3.2),('H',1.5),('D',1.5)],
        'C':[('D',1.5),('B',4.3)],
        'D':[('C',-0.5),('E',5)],
        'E':[('D',1.25),('G',3),('F',2)],
        'F':[('E',-1),('G',4.5)],
        'G':[('G',3),('F',1.2),('H',1.3)],
        'H':[]
    }
 