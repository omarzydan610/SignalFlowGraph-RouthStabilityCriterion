import sympy as sp

class RouthHurwitz:
    def __init__(self, coefficients=None):
        self.parsed_expression = None
        self.symbols_dict = None
        self.coefficients = coefficients

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

    def array_to_expression(self):
        """Convert an array of coefficients to a symbolic expression
        Coefficients are in decreasing order of power
        Example: [1,5,2,3] -> s^3 + 5*s^2 + 2*s + 3
        """
        s = sp.Symbol('s')
        if not self.coefficients:
            return None
        
        expr = 0
        for i, coef in enumerate(self.coefficients):
            power = len(self.coefficients) - i - 1
            expr += coef * s**power
        
        return expr

    def get_characteristic_equation(self, coefficients=None):
        """Parse the coefficients array or input string into a sympy expression
        
        Args:
            coefficients: Optional array of coefficients in decreasing order of power
            
        Returns:
            True if parsing was successful, False otherwise
        """
        if coefficients is not None:
            self.coefficients = coefficients
            
        if self.coefficients is not None:
            try:
                self.parsed_expression = self.array_to_expression()
                s = sp.Symbol('s')
                self.symbols_dict = {'s': s}
                return True
            except Exception as e:
                print("Error:", e)
                return False
        else:
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
            s = sp.Symbol('s')
            return sp.solve(self.parsed_expression, s)
        return []

    def _convert_to_serializable(self, obj):
        """Convert sympy objects and other non-serializable types to JSON-serializable types"""
        if isinstance(obj, (list, tuple)):
            return [self._convert_to_serializable(item) for item in obj]
        elif isinstance(obj, dict):
            return {k: self._convert_to_serializable(v) for k, v in obj.items()}
        elif hasattr(obj, 'is_real') and hasattr(obj, 'evalf'):  # For sympy numbers and expressions
            evalf_result = obj.evalf()
            # Check if the result is complex before converting to float
            if hasattr(evalf_result, 'is_complex') and evalf_result.is_complex or not evalf_result.is_real:
                real, imag = evalf_result.as_real_imag()
                if float(imag) == 0:
                    return float(real)
                return {"real": float(real), "imag": float(imag)}
            else:
                return float(evalf_result)
        elif hasattr(obj, 'as_real_imag'):  # For complex numbers from sympy
            real, imag = obj.as_real_imag()
            if float(imag) == 0:
                return float(real)
            return {"real": float(real), "imag": float(imag)}
        elif isinstance(obj, complex):
            return {"real": obj.real, "imag": obj.imag}  # Convert complex to dict representation
        else:
            # Try to convert to float or return as is
            try:
                return float(obj)
            except (TypeError, ValueError):
                return str(obj)

    def to_dict(self, coefficients=None):
        """Main method to analyze system stability using Routh-Hurwitz criterion
        
        Args:
            coefficients: Optional array of coefficients in decreasing order of power
            
        Returns:
            dict: Dictionary containing only routh matrix, stability status, and roots (if unstable)
        """
        # Initialize with just the essential fields
        result = {
            'isStable': False,
            'routhMatrix': []
        }
        
        if coefficients is not None:
            self.coefficients = coefficients
            
        if not self.get_characteristic_equation():
            return result
        
        if self.symbols_dict and 's' in self.symbols_dict:
            substituted_expr = self.parsed_expression
        else:
            substituted_expr = self.parsed_expression.subs(self.symbols_dict)
        
        print(f"Characteristic equation: {substituted_expr}")
        print(f"LaTeX form: {sp.latex(substituted_expr)}")
        
        coeff_dict = substituted_expr.as_coefficients_dict()
        normalized_dict = self.normalize_coeff_dict(coeff_dict)
        
        stability = 0
        matrix = self.initialize_routh_matrix(normalized_dict)
        routh_matrix, state = self.compute_routh_matrix(matrix)
        stability = self.determine_stability(routh_matrix)
        
        # Store the Routh matrix in the result - convert values to be JSON serializable
        result['routhMatrix'] = self._convert_to_serializable([row[:] for row in routh_matrix])
        
        if state == -1:
            print("System has a zero row in the Routh array ... Checking for Marginal Stability.")
        elif state == 0:
            print("System has a zero division error in the Routh array.")
        else:
            print("System has no zero division error in the Routh array.")
        
        print("Final Matrix: ", routh_matrix)
        
        if stability == 0:
            result['isStable'] = True
            print("Stability Check: System is Stable.")
        else:
            result['isStable'] = False
            print(f"Stability Check: System is Unstable and has {stability} roots in the positive side of the S-plane.")
        
        # Only include positive roots if the system is unstable
        if stability != 0:
            positive_roots = []
            count = 1
            for root in self.find_roots():
                root = sp.N(root)
                if sp.re(root) > 0:
                    # Convert complex roots to a serializable format
                    positive_roots.append(self._convert_to_serializable(root))
                    print(f"Root {count}: ", root)
                    count += 1
            
            # Only add roots to the result if there are any
            if positive_roots:
                result['positiveRoots'] = positive_roots
        
        # Final conversion to ensure everything is JSON serializable
        return self._convert_to_serializable(result)

if __name__ == "__main__":
    analyzer = RouthHurwitz()
    analyzer.analyze_stability()
