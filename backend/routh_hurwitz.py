import sympy as sp

class RouthHurwitz:
    def __init__(self):
        self.parsed_expression = None
        self.symbols_dict = None

    def normalize_coeff_dict(self, coeff_dict):
        """Generates a modified dictionary for the coefficients of the characteristic eqn
        in the form: s**4  s**3  s**2  s**1  s**0"""
        modified_dict = {}
        while coeff_dict:
            item = coeff_dict.popitem()
            if item[0] == 1:
                modified_dict["s**0"] = item[1]
            elif str(item[0]) == 's':
                modified_dict["s**1"] = item[1]
            else:
                modified_dict[str(item[0])] = item[1]
        return modified_dict

    def verify_powers_exist(self, powers):
        """Check whether all the powers exist or not
        NB: If the zero-th power doesn't exist it can't determine the result
        and needs further routh calculations."""
        p_list = []
        for pow in powers:
            p_list.append(int(pow[-1]))
        
        if len(p_list) == max(p_list) + 1:
            return True
        if 0 not in p_list and len(p_list) == max(p_list):
            return True
        return False

    def verify_coeff_signs(self, coefficients):
        """Checks whether the characterstic coeffiecients have the same sign or not"""
        negative = 0
        positive = 0
        for coeff in coefficients:
            if int(coeff) < 0:
                negative += 1
                if positive:
                    return False
            elif int(coeff) > 0:
                positive += 1
                if negative:
                    return False
        return True

    def initialize_routh_matrix(self, coeff_dict):
        """Initializes the Routh Array with the first 2 coefficienst Rows"""
        sorted_keys = sorted(coeff_dict.keys(), reverse=True)
        n = len(sorted_keys)
        m = n // 2 + n % 2
        x = 0
        routh_matrix = [[0 for _ in range(m)] for _ in range(n)]
        
        for i in range(0, n, 2):
            routh_matrix[0][x] = coeff_dict.get(sorted_keys[i])
            x += 1
        x = 0
        for i in range(1, n, 2):
            routh_matrix[1][x] = coeff_dict.get(sorted_keys[i])
            x += 1
            
        return routh_matrix

    def compute_routh_matrix(self, matrix):
        """Calculates the routh array for a given coeffiecients matrix
        Exceptions:
            case 0 row: handled if the auxilliary equation is even-ordered
            case 0 in the first column: handled using 1e-10 instead of 0
        Returns:
            matrix: The new Routh Array
            state: state identifying whether there is an exception."""
        n = len(matrix)
        state = 1
        for i in range(2, n):
            for j in range(0, len(matrix[0]) - 1):
                try:
                    if matrix[i-1][0] == 0:
                        raise ZeroDivisionError
                    matrix[i][j] = (matrix[i-1][0]*matrix[i-2][j+1] - matrix[i-2][0]*matrix[i-1][j+1]) / matrix[i-1][0]
                except ZeroDivisionError:
                    row = True
                    for j in range(0, len(matrix[0]) - 1):
                        if matrix[i-1][j] != 0:
                            row = False
                    if row:
                        state = -1
                        pow = n - (i - 2) - 1
                        if pow % 2 == 0:
                            for j in range(0, len(matrix[0])-1):
                                if pow >= 0:
                                    matrix[i-1][j] = pow * matrix[i-2][j]
                                    pow -= 2
                                matrix[i][j] = (matrix[i-1][0]*matrix[i-2][j+1] - matrix[i-2][0]*matrix[i-1][j+1]) / matrix[i-1][0]
                        else:
                            raise Exception("System can't be tested for stability: Odd-Ordered Auxiliary Equation")
                    else:
                        state = 0
                        matrix[i-1][0] = 1e-10
                        for j in range(0, len(matrix[0]) - 1):
                            matrix[i][j] = (matrix[i-1][0]*matrix[i-2][j+1] - matrix[i-2][0]*matrix[i-1][j+1]) / matrix[i-1][0]
                    
        return matrix, state

    def determine_stability(self, matrix):
        """Checks whether the system is stable after conducting the Routh Array"""
        n = len(matrix)
        sign_change = 0
        pos = True
        for i in range(0, n):
            if matrix[i][0] > 0 and not pos:
                pos = True
                sign_change += 1
            elif matrix[i][0] < 0 and pos:
                pos = False
                sign_change += 1
        return sign_change        

    def get_characteristic_equation(self):
        """Parse the input string into a sympy expression and 
        return the symbols used in the expression.
        Returns:
            parsed_expression: sympy expression
            symbols_dict: dictionary of symbols used in the expression
        """
        expression_str = input("Enter the Characteristic Equation in the form a*s**n + b*s**n-1 ... c*s**2 + d*s**1 + e(*s**0)\n")

        try:
            self.parsed_expression = sp.sympify(expression_str)
            self.symbols_dict = {str(symbol): symbol for symbol in self.parsed_expression.free_symbols}
            return True
        except Exception as e:
            print("Error:", e)
            return False

    def find_roots(self):
        """Solve the equation to find the values of the positive roots"""
        if self.parsed_expression and self.symbols_dict:
            return sp.solve(self.parsed_expression, self.symbols_dict)
        return []

    def analyze_stability(self):
        """Main method to analyze system stability using Routh-Hurwitz criterion"""
        while not self.get_characteristic_equation():
            print("Please enter a valid expression.")

        substituted_expr = self.parsed_expression.subs(self.symbols_dict)
        print(sp.latex(substituted_expr))
        coeff_dict = substituted_expr.as_coefficients_dict()
        normalized_dict = self.normalize_coeff_dict(coeff_dict)
        
        stability = 0
        if not self.verify_powers_exist(normalized_dict.keys()):
            print("System is Unstable: Missing powers of s.")
            print("Finding the number of roots.")
            print("________________________________________")
            stability = -1
        elif not self.verify_coeff_signs(normalized_dict.values()):
            print("System is Unstable: Coefficients alternate signs.")
            print("Finding the number of roots.")
            print("________________________________________")
            stability = -1
        else:
            matrix = self.initialize_routh_matrix(normalized_dict)
            routh_matrix, state = self.compute_routh_matrix(matrix)
            stability = self.determine_stability(routh_matrix)
            
            if state == -1:
                print("System has a zero row in the Routh array ... Checking for Marginal Stability.")
            elif state == 0:
                print("System has a zero division error in the Routh array.")
            else:
                print("System has no zero division error in the Routh array.")
            print("Final Matrix: ", routh_matrix)
            
            if stability == 0:
                print("Stability Check: System is Stable.")
            else:
                print(f"Stability Check: System is Unstable and has {stability} roots in the positive side of the S-plane.")
        
        if stability:
            count = 1
            for root in self.find_roots():
                root = sp.N(root)
                if sp.re(root) > 0:
                    print(f"Root {count}: ", root)
                    count += 1

if __name__ == "__main__":
    analyzer = RouthHurwitz()
    analyzer.analyze_stability()
